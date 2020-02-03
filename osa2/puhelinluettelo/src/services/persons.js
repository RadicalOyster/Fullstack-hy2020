import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (person) => {
    return axios.delete(baseUrl + "/" + person.id)
}

export default { 
    getAll: getAll, 
    create: create, 
    deletePerson: deletePerson,
    update: update
  }