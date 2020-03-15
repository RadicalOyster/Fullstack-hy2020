const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const JWT_SECRET = 'TOTALLY SECRET KEY'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://tester:<PASSWORD GOES HERE>@cluster0-fpjmq.mongodb.net/test?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String, author: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      genres: [String]!
      published: Int!
    ): Book

    editAuthor (
      name: String!,
      setBornTo: Int
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }   
`

authorBookCount = async (name, books) => {
  return books.filter(book => book.author.name === name).length
}

saveBook = (args) => {
  Author.find({}).then(response => {
    author = response.find(author => author.name === args.author)._id
    newBook = new Book({
      title: args.title,
      published: args.published,
      author: author,
      genres: args.genres
    })
    newBook.save().then(response => {
      console.log(response)
    })
  }
  )
}

const getBookCounts = async (authors) => {
  const books = await Book.find({}).populate('author')
  for (var i = 0; i < authors.length; i++) {
    const bookCount = await authorBookCount(authors[i].name, books)
    author = {
      name: authors[i].name,
      born: authors[i].born,
      id: authors[i].id,
      bookCount: bookCount
    }
    authors[i] = author
  }
  return authors
}

const resolvers = {
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
  
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => {
      var authors = await Author.find({})
      return getBookCounts(authors)
    },
    allBooks: async (root, args) => {
      if (!args.title) {
        return Book.find({}).populate('author')
      }
      else {
        const books = await Book.find({}).populate('author')
        console.log(books.find(book => book.genres.includes(args.genre)))
        return books.filter(book => book.genres.includes(args.genre))
      }
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        return null
      }
      else {
        const authors = await Author.find({}).then(result => result.map(author => author.name))
        if (!(authors.includes(args.author))) {
          newAuthor = new Author({
            name: args.author
          })
          try {
            await newAuthor.save()
          }
          catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
        }
      }

      const bookAuthor = await (await Author.findOne({ name: args.author }))._id
      author = bookAuthor._id
      newBook = {
        title: args.title,
        published: args.published,
        author: bookAuthor,
        genres: args.genres,
      }
      console.log(newBook)
      bookToSave = new Book(newBook)
      try {
        await bookToSave.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const bookToReturn = await Book.findOne({ title: args.title }).populate('author')

      pubsub.publish('BOOK_ADDED', { bookAdded: bookToReturn })

      return (bookToReturn)
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        return null
      }
      const author = await Author.find({ name: args.name })
      console.log(author)
      if (author === []) {
        return null
      }

      editedAuthor = {
        name: args.name,
        id: author[0]._id,
        born: args.setBornTo
      }

      returnAuthor = await Author.findByIdAndUpdate(author[0]._id, editedAuthor, { new: true })
      return returnAuthor
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      console.log(user)

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})