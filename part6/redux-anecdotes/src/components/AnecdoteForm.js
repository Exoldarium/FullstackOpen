import { useDispatch } from "react-redux/es";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/messageReducer";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  async function addAnecdote(e) {
    e.preventDefault();
    const { value } = e.target.anecdote;
    e.target.anecdote.value = '';

    dispatch(createAnecdote(value));
    dispatch(setNotification({
      content: value
    }, 10));
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