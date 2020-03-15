import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
    id
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    author{name}
    published
    genres
    id
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $genres: [String]!, $published: Int!) {
  addBook(
    title: $title,
    author: $author,
    genres: $genres,
    published: $published
  ) {
    title
    author{ name }
    genres
    published
    id
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const USER = gql`
query {
  me  {
    username
    favoriteGenre
  }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
    }
  }
`