const Blog = ({blog, handleLikes, handleRemove, user}) => {
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

  return(
    <div style={blogStyle}>
      {blog.title} &nbsp; by {blog.author} <br />
      {blog.url} <br />
      Likes: {blog.likes} <button onClick={() => addLike()}>like</button> <br />
      {blog.user.name} <br />
      {user.username === blog.user.username ? <button onClick={() => handleRemove(blog)}>remove</button> : <br /> }
    </div>
  )
}

export default Blog
