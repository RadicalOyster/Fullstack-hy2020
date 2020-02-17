const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'This is a blog',
        author: 'Mickey Mouse',
        url: 'www.myblog.blogs.blog',
        likes: 4,
    },
    {
        title: 'This is a dog',
        author: 'Mickey Louse',
        url: 'www.myblogs.blog24s.blogger',
        likes: 1,
    },
    {
        title: 'This is a hog',
        author: 'Trickey Trousers',
        url: 'www.yourblog.blogs.blorrtw',
        likes: 9
    }
  ]

  beforeEach(async () => {
      await Blog.deleteMany({})

      initialBlogs.forEach(async (blog) => {
          let blogObject = new Blog(blog)
          await blogObject.save()
      })
  })

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('returned objects have the field id', async () => {
    await api
    .get('/api/blogs/')
    .expect(200)

    const response = await api.get('/api/blogs')
    body = response.body
    expect(body[0].id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})

test('posting a new blog adds a blog to the database', async() => {
    const newBlog = {
        title: 'MyTestBlog',
        author: 'Mickey Mouse',
        url: 'www.testhouseforthemouse.com',
    }
    
    await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(newBlogs.body.length).toBe(initialBlogs.length + 1)
})