import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const addPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => {
        return response.data
    })
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => {
        return response.data
    })
}

const update = (nameObject, id) => {
    const request = axios.put(`${baseUrl}/${id}`, nameObject)
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    addPerson: addPerson,
    deletePerson: deletePerson,
    update: update
}
