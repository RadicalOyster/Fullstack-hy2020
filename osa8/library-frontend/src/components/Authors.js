
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`
const Authors = (props) => {
  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR)
  if (!props.show) {
    return null
  }
  const authors = props.authors

  const changeAuthor = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo } })
    setName('')
    setBorn('')
  }

  const UpdateForm = () => {
    if (props.token) {
    return (
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={changeAuthor}>
          <div>
            author
          <AuthorSelector />
          </div>
          <div>
            born
          <input type="number" value={setBornTo}
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    )
    }
    return (
      null
    )
  }

  const AuthorSelector = () => {
    const authorNames = authors.map(author => <option value={author.name} key={author.id}>{author.name}</option>)
    return (
      <select onChange={({ target }) => setName(target.value)}>
        {authorNames}
      </select>
    )
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <UpdateForm/>
    </div>
  )
}

export default Authors
