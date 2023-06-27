export default function NotificationMessage({ error, success }) {
  if (error === null || success === null) {
    return;
  }
  if (error) {
    return (
      <div className='error'>
        {error}
      </div>
    )
  }
  if (success) {
    return (
      <div className='success'>
        {success}
      </div>
    )
  }
}