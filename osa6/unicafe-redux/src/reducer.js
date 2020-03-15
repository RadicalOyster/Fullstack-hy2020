const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      var newState = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      }
      state = newState
      return state
    case 'OK':
      newState = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      }
      state = newState
      return state
    case 'BAD':
      newState = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1
      }
      state = newState
      return state
    case 'ZERO':
      newState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return initialState
    default: return state
  }
  
}

export default counterReducer