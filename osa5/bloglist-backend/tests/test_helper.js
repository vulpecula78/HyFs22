
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

const newBlog = {
  title: 'React testaus',
  author: 'ML',
  url: 'https://fullstackjutut.fi/',
  likes: 11
}

const noLikesBlog = {
  title: 'React testaus2',
  author: 'ML',
  url: 'https://fullstackjutut.fi/'
}

const noUrlBlog = {
  title: 'React testaus',
  author: 'ML',
  likes: 11
}

const noTitleBlog = {
  author: 'ML',
  url: 'https://fullstackjutut.fi/',
  likes: 11
}

const editedBlog = {
  title: 'CSR',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.kumpula.fi',
  likes: 127
}

module.exports = {
  initialBlogs, newBlog, noLikesBlog, noUrlBlog, noTitleBlog, editedBlog
}
