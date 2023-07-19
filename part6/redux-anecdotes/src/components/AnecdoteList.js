import { useDispatch, useSelector } from "react-redux/es";
import { vote } from "../reducers/anecdoteReducer";

export default function AnecdoteList() {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();
  console.log({ anecdotes: anecdotes })

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