const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user')

    response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    if (blog.likes === undefined) {
        blog.likes = 0
    }

    blog.save()
        .then(savedBlog => {
            response.json(savedBlog.toJSON())
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const idToDelete = request.params.id
    
    await Blog.findByIdAndDelete(idToDelete).catch(error => next(error))
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, {new : true})
    response.status(200).end()
})

module.exports = blogsRouter