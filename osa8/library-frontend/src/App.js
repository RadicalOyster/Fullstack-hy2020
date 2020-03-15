
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import Menu from './components/Menu'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, USER, BOOK_ADDED } from './queries'
import LoginForm from './components/LoginForm'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const authorsResult = useQuery(ALL_AUTHORS, { pollInterval: 2000 })
  const booksResult = useQuery(ALL_BOOKS, { pollInterval: 2000 })
  const userResult = useQuery(USER, { pollInterval: 2000 })
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  if (authorsResult.loading || booksResult.loading ||userResult.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Menu token={token} setPage={setPage} logout={logout} />
      <Notify errorMessage={errorMessage} />
      <LoginForm
        setToken={setToken}
        setError={notify}
        token={token} />
      <Authors
        show={page === 'authors'} authors={authorsResult.data.allAuthors} token={token}
      />

      <Books
        show={page === 'books'} books={booksResult.data.allBooks}
      />

      <Recommended
        show={page === 'recommended'} books={booksResult.data.allBooks} user={userResult.data.me}
      />

      <NewBook
        show={page === 'add'} token={token}
      />

    </div>
  )
}

export default App