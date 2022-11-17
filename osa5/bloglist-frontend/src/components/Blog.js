import { useState } from 'react'
const Blog = ({ blog, handleLikes, handleRemove, user }) => {
  const [hidden, setHidden] = useState(true)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    borderColor: 'green',
    marginBottom: 5
  }

  const addLike = () => {
    const liked = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user._id,
      likes: blog.likes + 1
    }
    handleLikes(liked)
  }

  if (hidden) {
    return (
      <div style={blogStyle}>
        {blog.title} &nbsp; by {blog.author} &nbsp; <button onClick={() => setHidden(false)}>show</button> <br />
      </div>
    )
  }

  return(
    <div style={blogStyle}>
      {blog.title} &nbsp; by {blog.author} &nbsp; <button onClick={() => setHidden(true)}>hide</button> <br />
      {blog.url} <br />
      Likes: {blog.likes} <button onClick={() => addLike()}>like</button> <br />
      {blog.user.name} <br />
      {user.username === blog.user.username ? <button onClick={() => handleRemove(blog)}>remove</button> : <br /> }
    </div>
  )
}

export default Blog
