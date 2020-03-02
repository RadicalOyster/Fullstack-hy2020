import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const updatedAnecdote = action.data

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote).sort((a, b) => (a.votes < b.votes) ? 1 : (a.votes === b.votes) ? ((a.content > b.content) ? 1 : - 1) : - 1)

    case 'NEW_ANECDOTE':
      return state.concat(action.data)

    case 'INIT_ANECDOTES':
      const newState = action.data
      state = newState
      console.log(action.data)
      return action.data

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const applyVote = (content) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(content)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }

}

export default reducer