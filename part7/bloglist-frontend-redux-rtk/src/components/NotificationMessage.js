import { useSelector } from 'react-redux';

export default function NotificationMessage() {
  const notification = useSelector(({ message }) => {
    if (message) {
      return message
    }
  });

  if (notification.type === undefined) {
    return null
  } else {
    return (
      <>
        {notification.type === 'SUCCESS'
          ?
          <div className="success">{notification.content}</div>
          :
          <div className="error">{notification.content}</div>}
      </>
    )
  }
}

