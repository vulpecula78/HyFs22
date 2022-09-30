const blogRouter = require('express').Router()
const Blog = require('../models/bloglist')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  console.log(request.headers)
  blog
    .save()
    .then(result => {
      console.log(`Added ${blog.title} by ${blog.author} into bloglist.`)
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogRouter