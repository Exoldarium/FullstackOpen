import { useSelector } from "react-redux/es/hooks/useSelector"

export default function Notification() {
  const notification = useSelector(({ anecdotes, message }) => {
    if (message.id) {
      const anecdote = anecdotes.find(anecdote => anecdote.id === message.id);
      return `voted for ${anecdote.content}`
    }
    // const anecdote = await anecdotes.find(anecdote => anecdote.content === message.content) || '';
    // return `added ${anecdote.content}`
  });

  console.log(notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}