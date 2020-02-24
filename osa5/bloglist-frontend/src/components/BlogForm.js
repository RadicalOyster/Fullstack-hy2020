import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    newTitle,
    newAuthor,
    newUrl,
    setShowForm,
    addBlog
}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                title:
                <input
                    value={newTitle}
                    onChange={handleTitleChange}
                    name="title"
                /><br />
                author:
                <input
                    value={newAuthor}
                    onChange={handleAuthorChange}
                    name="author"
                /><br />
                url:
                <input
                    value={newUrl}
                    onChange={handleUrlChange}
                    name="url"
                /><br />
                <button type="submit" name="submit-button">create</button>
            </form>
            <button onClick={() => setShowForm(false)}>cancel</button>
        </div>
    )
}

BlogForm.propTypes = {
    handleTitleChange: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
    setShowForm: PropTypes.func.isRequired,
    addBlog: PropTypes.func.isRequired,
    newTitle: PropTypes.string.isRequired,
    newAuthor: PropTypes.string.isRequired,
    newUrl: PropTypes.string.isRequired
}

export default BlogForm