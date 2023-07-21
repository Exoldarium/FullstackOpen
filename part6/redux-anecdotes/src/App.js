import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // we send our anecdotes from the server to our reducer
    dispatch(initializeAnecdotes())
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