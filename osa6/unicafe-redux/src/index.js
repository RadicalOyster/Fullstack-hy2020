import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  return (
    <div>
      <button
        onClick={e => store.dispatch({ type: 'GOOD' })}>
        Hyvä
      </button>
      <button
        onClick={e => store.dispatch({ type: 'OK' })}>
        Neutraali
      </button><button
        onClick={e => store.dispatch({ type: 'BAD' })}>
        Huono
      </button>
      <button
        onClick={e => store.dispatch({ type: 'ZERO' })}>
        Nollaa tilastot
      </button>

      <Statistics />
    </div>
  )
}

const Statistics = () => (
  <div>
    <h2>Statistiikkaa</h2>
    <p>Hyvä: {store.getState().good}</p>
    <p>Neutraali: {store.getState().ok}</p>
    <p>Huono: {store.getState().bad}</p>
    <p>All: {getAll()}</p>
    <p>Average: {getAverage()}</p>
    <p>Positive: {getPositive()}%</p>
  </div>
)

const getAll = () => {
  const votes = store.getState()
  return votes.good + votes.bad + votes.ok
}

const getAverage = () => {
  const votes = store.getState()
  
  return ((votes.good - votes.bad) / (votes.good + votes.bad + votes.ok))
}

const getPositive = () => {
  const votes = store.getState()
  return votes.good / getAll() * 100
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)