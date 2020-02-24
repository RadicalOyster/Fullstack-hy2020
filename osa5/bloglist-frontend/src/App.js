import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )


      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log(user)
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      url: newUrl,
      author: newAuthor,
      user: user
    }
    const title = newTitle
    const author = newAuthor
    setNotificationMessage('a new blog ' + title + " by " + author + " added")
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewUrl('')
        setNewAuthor('')
        setShowForm(false)
      })

  }

  const ErrorMessage = (props) => (
    <div>
      <font color="red">{props.message}</font>
    </div>
  )

  const Notification = (props) => (
    <div>
      <font color="green">{props.message}</font>
    </div>
  )

  const ShowBlogs = () => {
    return (
      <div>
        <Notification message={notificationMessage} />
        <p>{user.name} logged in
      <button type="button" name="logout-button" onClick={handleLogout}>logout</button></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog} like={like}/>
        )}
      </div>
    )
  }

  const like = (blog) => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id,
      url: blog.url
    }
    blogService.update(blog.id, newBlog)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const deleteBlog = (blog, userToken) => {
    if (window.confirm("Remove blog " + blog.title + " by " + blog.author)) {
      const id = blog.id
      blogService.remove(blog.id, userToken)
      setBlogs(blogs.filter(blogInList => blogInList.id !== id))
    }
  }

  if (user === null) {
    return (
      <LoginForm ErrorMessage={ErrorMessage} errorMessage={errorMessage} handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
    )
  }

  if (showForm === false) {
    return (
      <div>
        <h2>blogs</h2>
        <ShowBlogs />
        <button name="newblog-button" onClick={() => setShowForm(true)}>new blog</button>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <ShowBlogs />
      <BlogForm
        handleTitleChange={handleTitleChange}
        handleUrlChange={handleUrlChange}
        handleAuthorChange={handleAuthorChange}
        newTitle={newTitle}
        newUrl={newUrl}
        newAuthor={newAuthor}
        setShowForm={setShowForm}
        addBlog={addBlog} />
    </div>
  )
}

export default App