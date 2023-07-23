import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNew } from "../requests/requests";
import { useDispatchValue } from "../ContextProvider";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatchValue();

  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({
        type: "CREATED_NEW",
        payload: newAnecdote
      })
    },
    onError: (error) => {
      console.log(error.message)
      dispatch({
        type: "ERROR",
        payload: error.message
      })
    }
  })

  console.log(newAnecdoteMutation)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 });
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
