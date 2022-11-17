import { useState } from 'react'
import PropTypes from 'prop-types'

const AddNewBlogForm = ({ addNewBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddNew = async(event) => {
    event.preventDefault()
    addNewBlog({
      title: title,
      author: author,
      url: url,
      user: user._id
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleAddNew}>
            title: &nbsp;
        <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)}/>
        <br />
            author: &nbsp;
        <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)}/>
        <br />
            url: &nbsp;
        <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)}/>
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

AddNewBlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default AddNewBlogForm
