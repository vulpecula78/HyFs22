import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogListUserLogin')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('blogListUserLogin', JSON.stringify(user))
    } catch (exception) {
      setMessage('error! wrong username or password')
      setTimeout(() => {
        setMessage(null) }, 5000)
      }
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('blogListUserLogin')
    setMessage('Logged out')
    setTimeout(() => {
      setMessage(null) }, 5000)
    }

  const handleCreateNew = async(event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }
      blogService
        .createBlog(newBlog)
        .then(returned => {
          setBlogs(blogs.concat(returned))
          setMessage(`New blog ${newBlog.title} by ${newBlog.author} added`)
          setTimeout(() => {
            setMessage(null) }, 5000)
          setNewBlog('')
        })
    } catch (exception) {
        setMessage('error! failed to add new blog!')
        setTimeout(() => {
          setMessage(null) }, 5000)
        }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password:
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const createNewForm = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateNew}>
        <div>
          title: &nbsp;
          <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)}/>
          <br />
          author: &nbsp;
          <input type="text" value={author} name="title" onChange={({ target }) => setAuthor(target.value)}/>
          <br />
          url: &nbsp;
          <input type="text" value={url} name="title" onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )


    if (user === null) {
    return (
      <div>
      <Notification message={message} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>
        {user.name} logged in &nbsp;
        <button onClick={handleLogout}>logout</button>
      </p>
      <p>
        {createNewForm()}
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App
