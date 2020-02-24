import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: "A Test Blog",
    url: "www.sturefisk.com",
    author: "Sture Fisk",
    likes: 5,
    user: {
        blogs: [
            {
            title: "This is a new blog",
            url: "www.moisterhoister.com",
            author: "Mooster",
            likes: 27,
            id: "5e52d6357358d83ecc7a500f"
            }
            ],
            username: "CoolMandrill",
            name: "Tero Pippuri",
            id: "5e52d5fd7358d83ecc7a500e"
    },
    id: "123456"
}

test('by default only the title of the blog and the author are shown', () => {
  const component = render(
    <Blog blog={blog} />
  )

  const correctText = component.getByText(
    'A Test Blog Sture Fisk'
  )

  expect(correctText).toBeDefined()
})

test('clicking the button reveals url and likes', async () => {
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={blog.user} showFull={mockHandler}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
        'Sture Fisk'
    )
    expect(component.container).toHaveTextContent(
        'A Test Blog'
    )
    expect(component.container).toHaveTextContent(
        'www.sturefisk.com'
    )
    expect(component.container).toHaveTextContent(
        'likes: 5'
    )
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={blog.user} like={mockHandler}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    var mockCount = 0

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    mockCount += mockHandler.mock.calls.length
    fireEvent.click(likeButton)
    mockCount += mockHandler.mock.calls.length
    expect(mockCount).toBe(2)
  })