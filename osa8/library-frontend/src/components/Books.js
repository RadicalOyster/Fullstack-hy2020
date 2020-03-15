import React from 'react'
import {useState} from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  if (!props.show) {
    return null
  }

  const books = props.books
  const genres = books.map(book => book.genres)

  const genreSet = new Set()

  for (var i = 0; i < genres.length; i++) {
    genres[i].forEach(genre => genreSet.add(genre))
  }

  const GenreSelection = () => {
    return (
      <div>
        {Array.from(genreSet).map(genre => <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>)}
        <button key="rst" onClick={() => setGenre('')}>reset</button>
      </div>
    )
  }

  const filteredBooks = () => {
    if (genre === '') {
      return books
    }
    else {
      return (
        books.filter(book => book.genres.includes(genre))
      )
    }
  }

  const ListBooks = () => {
    return (
      <div>
        <h2>books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
            </th>
              <th>
                published
            </th>
            </tr>
            {filteredBooks(books).map(
              a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <ListBooks books={books} />
      <GenreSelection />
    </div>
  )
}

export default Books