import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import anecdoteService from './services/anecdotes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAnecdote } from './reducers/anecdoteReducer';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await anecdoteService.getAll();
      // we send our anecdotes from the server to our reducer
      return dispatch(setAnecdote(res))
    })();
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}