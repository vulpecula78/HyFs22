import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = { headers: { Authorization: token } }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const createBlog = async newBlog => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (id, updatedBlog) => {
  console.log('Lisataan like')
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

const removeBlog = async(blogId) => {
  console.log('Remove:', blogId)
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}


export default { getAll, setToken, createBlog, updateBlog, removeBlog }
