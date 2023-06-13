export default function NotificationMessage({ message }) {
  if (message === null) {
    return;
  }
  return (
    <div className={message ? 'error' : ''}>
      {message}
    </div>
  )
}