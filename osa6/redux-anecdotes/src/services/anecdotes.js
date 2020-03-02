import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data.sort((a, b) => (a.content > b.content) ? 1 : -1)
}

const createNew = async (content) => {
    const object = {
        content: content,
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const addVote = async (content) => {
    content.votes += 1
    const request = axios.put(`${baseUrl}/${content.id}`, content)
    return request.then(response => response.data)
}

export default { getAll, createNew, addVote }