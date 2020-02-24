import React, { useState } from 'react'

const Blog = ({ blog, user, deleteBlog, like }) => {
  const [showFull, setShowFull] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const FullView = () => (
    <div>
      {blog.title} {blog.author} <button onClick={() => setShowFull(false)}>hide</button>
      <br />
      {blog.url}
      <br />
      likes: {likes} <button name="like-button" onClick={() => {
        like(blog)
        setLikes(likes + 1)
      }
      }>like</button>
      <br />
      {blog.user.name}
    </div>
  )

  if (showFull === false) {
    return (
      <div>
        {blog.title} {blog.author} <button name='view-button' onClick={() => setShowFull(true)}>view</button>
      </div>
    )
  }

  else if (blog.user.username === user.username) {
    return (
      <div>
        <FullView />
        <button name='delete-button' onClick={() => deleteBlog(blog, user.token)}>remove</button>
      </div>
    )
  }

  else {
    return (
      <FullView />
    )
  }
}



export default Blog
