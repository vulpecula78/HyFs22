import { useState } from 'react'

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
}

export default AddNewBlogForm
