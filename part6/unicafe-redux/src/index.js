import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
      payload: {
        good: 0
      }
    });
  }

  const ok = () => {
    store.dispatch({
      type: 'OK',
      payload: {
        ok: 0
      }
    });
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD',
      payload: {
        bad: 0
      }
    });
  }

  const reset = () => {
    store.dispatch({
      type: 'RESET'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
