import { useSelector } from "react-redux/es/hooks/useSelector"

export default function Notification() {
  const notification = useSelector(({ anecdotes, message }) => {
    if (message.id) {
      const anecdote = anecdotes.find(anecdote => anecdote.id === message.id);
      return `voted for ${anecdote.content}`
    }

    const anecdote = anecdotes.find(anecdote => anecdote.content === message.content);
    if (anecdote === undefined) {
      return ''
    } else {
      const content = anecdote.content;
      return `added ${content}`
    }
  });

  const style = {
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}