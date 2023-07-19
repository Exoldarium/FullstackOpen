import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';

export default function App() {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}