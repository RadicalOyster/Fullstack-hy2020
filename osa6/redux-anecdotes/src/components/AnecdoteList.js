import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { applyVote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'

const List = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
    dispatch(applyVote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5000))
    }

    return (
        <div>
            {anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default List