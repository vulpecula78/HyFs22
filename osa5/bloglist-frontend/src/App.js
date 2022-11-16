import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import AddNewBlogForm from './components/addnewblogform'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

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

  const addNewBlog = async(newBlog) => {
    try {
      const addedBlog = await blogService.createBlog(newBlog)

      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(addedBlog))
      updateBlogList()
      setMessage(`New blog ${newBlog.title} by ${newBlog.author} added`)
          setTimeout(() => {
            setMessage(null) }, 5000)
    } catch (exception) {
      setMessage('error! failed to add new blog!')
        setTimeout(() => {
          setMessage(null) }, 5000)
    }
  }

  const handleLikes = async(blog) => {
    console.log('liked:', blog.id)
    try {
      const liked = await blogService.updateBlog(blog.id, blog)
      blogService.getAll().then(blogs => setBlogs( blogs ))
      setMessage(`You liked ${liked.title} by ${liked.author}.`)
          setTimeout(() => {
            setMessage(null) }, 5000)
    } catch (exception) {
      setMessage('error! failed to like.')
        setTimeout(() => {
          setMessage(null) }, 5000)
    }
  }

  const handleRemove = async(blog) => {
    if (window.confirm(`Really remove blog: ${blog.title}???`)) {
      try {
        const removed = await blogService.removeBlog(blog.id)
        blogService.getAll().then(blogs => setBlogs( blogs ))
          setMessage(`You liked ${removed.title} by ${removed.author}.`)
            setTimeout(() => {
              setMessage(null) }, 5000)
        } catch (exception) {
          setMessage('error! failed to like.')
            setTimeout(() => {
              setMessage(null) }, 5000)
      }
    }
  }

  const updateBlogList = () => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
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
      <Togglable buttonLabel='Add blog' ref={blogFormRef}>
        <p>
          <AddNewBlogForm addNewBlog={addNewBlog} user={user} />
        </p>
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleRemove={handleRemove} user={user}/>
      )}

    </div>
  )
}

export default App
