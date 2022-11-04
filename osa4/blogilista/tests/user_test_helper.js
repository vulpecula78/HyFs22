const User = require('../models/user')

const firstUser = {
  username: 'Testaaja',
  name: 'Testi Nimi',
  password: '123456'
}

const secondUser = {
  username: 'blogaaja',
  name: 'Boris Blog',
  password: 'qwerty'
}

const shortUser = {
  username: 'JT',
  name: 'Jokke Jyvätykki',
  password: 'qwerty'
}

const noPasswordUser = {
  username: 'Jokke',
  name: 'Jokke Jyvätykki',
  password: ''
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  firstUser, secondUser, shortUser, noPasswordUser, usersInDb
}
