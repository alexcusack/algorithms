// import {connect, Provider } from 'react-redux'

import redux from 'redux'

const initialState = Object.freeze({
  count: 0,
})

// Object.freeze(initialState)
const rootReducer = (state, action) => {
  if (action.type === 'INCREMENT_COUNT') {
    return Object.assign({}, state, { count: state.count + 1 })
  }
  return state
}

const store = redux.createStore(initialState, rootReducer)

store.dispatch({type: 'INCREMENT_COUNT'})
// initialState.count++
console.log(store.getState())
