const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      action.payload.good += 1;
      return { ...state, good: state.good + action.payload.good }
    case 'OK':
      action.payload.ok += 1;
      return { ...state, ok: state.ok + action.payload.ok }
    case 'BAD':
      action.payload.bad += 1;
      return { ...state, bad: state.bad + action.payload.bad }
    case 'RESET':
      return initialState
    case 'ZERO':
      return undefined
    default: return state
  }
}

export default counterReducer
