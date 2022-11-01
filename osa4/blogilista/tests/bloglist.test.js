const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/bloglist')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async() => {
  await Blog.deleteMany({})
  let blogObj = new Blog(helper.initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(helper.initialBlogs[1])
  await blogObj.save()
  blogObj = new Blog(helper.initialBlogs[2])
  await blogObj.save()
})

describe('Tests for getting blogs and id field is defined', () => {
  test('GET returns correct amount of blogs in json-format.', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('id field is defined', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Tests adding new valid and unvalid blogs', () => {
  test('Blogs can be added into database', async() => {

    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('Number of likes is set to zero, if no value given', async() => {

    await api
      .post('/api/blogs')
      .send(helper.noLikesBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body[3].likes).toBe(0)
  })

  test('Adding blog with missing url produces \'bad request\'', async() => {

    await api
      .post('/api/blogs')
      .send(helper.noUrlBlog)
      .expect(400)
  })

  test('Adding blog with missing title produces \'bad request\'', async() => {

    await api
      .post('/api/blogs')
      .send(helper.noTitleBlog)
      .expect(400)
  })
})

describe('Tests deleting blog by id', () => {
  test('Delete blog with valid id', async() => {
    await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .expect(204)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
  })

  test('Delete blog with invalid id', async() => {
    await api
      .delete('/api/blogs/5a422a85b54a676234d17f7')
      .expect(400)
  })

  test('Delete non-excisting blog with valid id', async() => {
    await api
      .delete('/api/blogs/5aff2a851b54a676234d17f7')
      .expect(204)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Tests editing blogs works', () => {
  test('edit blog with valid id', async() => {
    await api
      .put('/api/blogs/5a422b3a1b54a676234d17f9')
      .send(helper.editedBlog)
      .expect(200)

    const response = await api.get('/api/blogs')
    expect(response.body[2].likes).toBe(127)
  })

  test('edit blog with invalid id', async() => {
    await api
      .put('/api/blogs/5a422b3a1b54aw76234d17f9')
      .send(helper.editedBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})


