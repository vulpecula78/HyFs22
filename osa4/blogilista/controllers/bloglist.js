const blogRouter = require('express').Router()
const Blog = require('../models/bloglist')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.user)

  if (!request.body.title || !request.body.url) {
    return response.status(400).json({})
  }

  const newBlog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const sBlog = await newBlog.save()
  user.blogs = user.blogs.concat(sBlog._id)
  await user.save()
  response.status(201).json(sBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async(request, response) => {
  const body = request.body

  const editedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const editedResult = await Blog.findByIdAndUpdate(request.params.id, editedBlog, { new: true })
  response.status(200).json(editedResult.toJSON())
})

module.exports = blogRouter
