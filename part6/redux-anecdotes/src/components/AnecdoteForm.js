import { useDispatch } from "react-redux/es";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { voteMessage } from "../reducers/messageReducer";
import anecdoteService from "../services/anecdotes";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  async function addAnecdote(e) {
    e.preventDefault();
    const { value } = e.target.anecdote;
    e.target.anecdote.value = '';

    const res = await anecdoteService.createNew(value);

    dispatch(createAnecdote(res));
    dispatch(voteMessage({
      content: value
    }));
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}