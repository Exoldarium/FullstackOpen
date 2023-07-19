const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

function getId() {
  return (100000 * Math.random()).toFixed(0);
}

function asObject(anecdote) {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(anecdote => asObject(anecdote));

export default function reducer(state = initialState, action) {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      const { votes, content } = action.payload
      return [...state, { content, votes, id: action.payload.id }]
    case 'NEW_VOTE':
      const { id } = action.payload;
      const anecdote = state.find(anecdote => anecdote.id === id)
      anecdote.votes += 1;

      const newState = state.map(anecdotes => anecdotes.id !== id ? anecdotes : anecdote)
      const sorted = newState.sort((first, second) => second.votes - first.votes);
      return sorted
    default:
      return state
  }
}

export function vote(id) {
  return {
    type: 'NEW_VOTE',
    payload: { id }
  }
}

export function createAnecdote(content) {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      votes: 0,
      id: getId()
    }
  }
}
