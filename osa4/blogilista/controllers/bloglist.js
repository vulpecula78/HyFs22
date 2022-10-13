const blogRouter = require('express').Router()
const Blog = require('../models/bloglist')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!request.body.title || !request.body.url) {
    return response.status(400).json({})
  }

  const sBlog = await blog.save()
  response.status(201).json(sBlog)

})

module.exports = blogRouter
