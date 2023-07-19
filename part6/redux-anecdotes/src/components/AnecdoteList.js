import { useDispatch, useSelector } from "react-redux/es";
import { vote } from "../reducers/anecdoteReducer";

export default function AnecdoteList() {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    console.log(anecdotes, filter);
    if (filter === 'ALL') {
      return anecdotes
    }
    return anecdotes
      .filter(anecdote => anecdote.content
        .toLowerCase()
        .includes(filter.toLowerCase()));
  });
  const dispatch = useDispatch();

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}