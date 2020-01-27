import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Display = ({ anecdotes, selected, points }) => {
    return (
        <div>{anecdotes[selected]}
        <p>Has {points[selected]} votes</p>
        <p><b>Anecdote with most votes</b> </p>
        <p>{anecdotes[mostVoted(points)]}</p>
        </div>
    )
}
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const RandomAnecdote = (selected) => {
    while (true) {
        let random = Math.floor(Math.random() * anecdotes.length)
        if (random !== selected) {
            return random
        }
    }
}

const incrementPoints = (selected, points) => {
    const copy = [...points]
    copy[selected] += 1
    return copy
}

const mostVoted = (points) => {
    let max = -1
    points.forEach(votes => {
        if (votes > max) {
            max = votes
        }
    })
    return max
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
    const initialPoints = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(initialPoints)
    const selectRandom = () => setSelected(RandomAnecdote(selected))
    const castVote = () => setPoints(incrementPoints(selected, points))

    return (
        <div>
            <Display anecdotes={anecdotes} selected={selected} points={points} />
            <p><Button text={'Next anecdote'} handleClick={selectRandom} /></p>
            <p><Button text={'Vote'} handleClick={castVote} /></p>
        </div>
    )

}

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)