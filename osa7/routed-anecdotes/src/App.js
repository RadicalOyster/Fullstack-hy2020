import React, { useState } from 'react'
import {
  Switch, Route, Link, useHistory, useRouteMatch
} from "react-router-dom"
import { useField } from './hooks/index'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(`A new anecdote ${content.value} created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)
    history.push('/')
  }

  const resetFields = () => {
    content.reset()
    info.reset()
    author.reset()
  }

  var {reset, ...contentNoReset} = content
  // eslint-disable-next-line no-redeclare
  var {reset, ...infoNoReset} = info
  // eslint-disable-next-line no-redeclare
  var {reset, ...authorNoReset} = author

  console.log(content)

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
      <input name='content' {...contentNoReset} />
        </div>
        <div>
          author
      <input name='author' {...authorNoReset} />
        </div>
        <div>
          url for more info
      <input name='info' {...infoNoReset} />
        </div>
        <button>create</button>
        <button type='button' onClick={resetFields}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const match = useRouteMatch('/anecdotes/:id')
  var id = null
  if (match !== null) {
    id = match.params.id.toString()
  }

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const ShowAnecdote = ({ id }) => {
    const anecdote = anecdoteById(id)
    return (
      <div>
        <h1>{anecdote.content} by {anecdote.author}</h1>
        <p>has {anecdote.votes} votes</p>
        <p>for more information see <a href={anecdote.info}>{anecdote.info}</a></p>
      </div>
    )
  }

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <br />
      {notification}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} setNotification={setNotification} />
        </Route>
        <Route path="/anecdotes/:id">
          <ShowAnecdote id={id} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;
