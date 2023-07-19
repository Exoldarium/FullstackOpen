import Anecdotes from './components/Anecdotes';
import CreateAnecdote from './components/CreateAnecdote';

export default function App() {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <CreateAnecdote />
    </div>
  )
}