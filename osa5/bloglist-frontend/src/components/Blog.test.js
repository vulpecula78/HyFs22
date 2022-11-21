import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'koe blogi',
  author: 'Blogin Kirjoittaja',
  url: 'www.localhost.fi/blogi',
  user: '636a24492c83072b5ad31b6a',
  likes: 3,
  id: '636d24b1a0be3f7d16395118'
}
const user = 'test'

test ('Blog renders only title and author', () => {
    render(<Blog blog={blog} />)

    const element1 = screen.getByText('koe blogi by Blogin Kirjoittaja')
    const element2 = screen.queryByText('www.localhost.fi/blogi')
    expect(element1).toBeDefined()
    expect(element2).toBe(null)
})

test('Clicking show makes url, likes and author visible', async() => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} />)

  const clicker = userEvent.setup()
  const button = screen.getByText('show')
  await clicker.click(button)
  const element = screen.getByText('www.localhost.fi/blogi')
  const likeButton = screen.getByText('like')

  expect(element).toBeDefined()
  expect(likeButton).toBeDefined()
})

test('Clicking 2 times like calls 2 times handleLikes', async() => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLikes={mockHandler} />)

  const clicker = userEvent.setup()
  const showButton = screen.getByText('show')
  await clicker.click(showButton)
  const likeButton = screen.getByText('like')
  await clicker.click(likeButton)
  await clicker.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
