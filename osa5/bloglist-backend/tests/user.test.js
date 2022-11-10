const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const users = require('./user_test_helper')

const api = supertest(app)

describe('Tests to add new user', () => {
  beforeEach(async() => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({
      username: 'Testaaja',
      name: 'Testi Nimi',
      password: passwordHash
    })

    await user.save()
  })

  test('creation of the new user', async() => {
    const usersAtStart = await users.usersInDb()

    await api
      .post('/api/users')
      .send(users.secondUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await users.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(usr => usr.username)
    expect(usernames).toContain(users.secondUser.username)
  })

  test('creation fails with existing username', async() => {
    const result = await api
      .post('/api/users')
      .send(users.firstUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username taken')
  })

  test('creation fails with too short username', async() => {
    const result = await api
      .post('/api/users')
      .send(users.shortUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid username')
  })

  test('creation fails with too short password', async() => {
    const result = await api
      .post('/api/users')
      .send(users.noPasswordUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid password')
  })

})

afterAll(() => {
  mongoose.connection.close()
})
