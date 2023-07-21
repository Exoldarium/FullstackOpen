import { useDispatch, useSelector } from "react-redux/es";
import { updateAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/messageReducer";

export default function AnecdoteList() {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ anecdotes, filter, message }) => {
    console.log(anecdotes, filter, message);
    if (filter === 'ALL') {
      return anecdotes
    }
    return anecdotes.filter(anecdote =>
      anecdote.content
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
  });

  function sendId(anecdote) {
    dispatch(updateAnecdotes(anecdote))
    dispatch(setNotification({
      id: anecdote.id
    }, 10));
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => sendId(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}