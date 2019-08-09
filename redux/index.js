function createStore(reducer, preloadState, enhancer) {
  let listeners = []
  let state = preloadState
  
  if(typeof preloadState === 'function' && !enhancer) {
    enhancer = preloadState
    preloadState = undefined
  }

  function subcribe(listener) {
    listeners.push(listener)

    return () => {
      let index = listeners.findIndex(listener)
      listener.splice(index, 1)
    }
  }

  function getState() {
    return state
  }

  function dispatch(action) {
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener()
    }
  }

  dispatch({
    type: Symbol()
  })

  return {
    getState,
    dispatch,
    replaceReducer,
    subcribe
  }
}

function combineReducer(reducers) {
  let keys = Object.keys(reducers)

  return function(state = {}, action) {
    const resultState = {}

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const reducer = reducers[key]
      const curReducerState = reducer(state[key], action)
      resultState[key] = curReducerState
    }

    return resultState
  }
}