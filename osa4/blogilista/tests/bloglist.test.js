const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/bloglist')

const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]

beforeEach(async() => {
  await Blog.deleteMany({})
  let blogObj = new Blog(initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[1])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[2])
  await blogObj.save()
})

test('GET returns correct amount of blogs in json-format.', async() => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('id field is defined', async() => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('Blogs can be added into database', async() => {
  const newBlog = {
    title: 'React testaus',
    author: 'ML',
    url: 'https://fullstackjutut.fi/',
    likes: 11
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('Number of likes is set to zero, if no value given', async() => {
  const newBlog = {
    title: 'React testaus2',
    author: 'ML',
    url: 'https://fullstackjutut.fi/'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blogs')
  expect(response.body[3].likes).toBe(0)
})

test("Adding blog with missing url produces 'bad request'", async() => {
  const newBlog = {
      title: 'React testaus',
      author: 'ML',
      likes: 11
    }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test("Adding blog with missing title produces 'bad request'", async() => {
  const newBlog = {
      author: 'ML',
      url: 'https://fullstackjutut.fi/',
      likes: 11
    }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
