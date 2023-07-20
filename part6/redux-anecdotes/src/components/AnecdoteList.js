import { useDispatch, useSelector } from "react-redux/es";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { voteMessage } from "../reducers/messageReducer";

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
    dispatch(voteAnecdote(anecdote.id));
    dispatch(voteMessage({
      id: anecdote.id
    }));
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