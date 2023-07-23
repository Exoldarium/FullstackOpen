export function messageReducer(state, action) {
  switch (action.type) {
    case "VOTE":
      const newVote = {
        content: `voted for ${action.payload.content}`,
      }
      return newVote
    case "CREATED_NEW":
      const newAnecdote = {
        content: `created ${action.payload.content}`,
      }
      return newAnecdote
    case "ERROR":
      console.log({ errorRed: action.payload })
      const newError = {
        content: `${action.payload}`
      }
      return newError
    case "CLEAR":
      return ''
    default:
      return state
  }
}