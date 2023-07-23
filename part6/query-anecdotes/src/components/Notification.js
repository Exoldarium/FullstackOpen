import { useEffect, useState } from "react";
import { useDispatchValue, useMessageValue } from "../ContextProvider";

const Notification = () => {
  const dispatch = useDispatchValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, 5000);
  })

  const notification = useMessageValue();
  console.log(notification)

  if (notification) {
    return (
      <div style={style}>
        {notification.content}
      </div>
    )
  }
}

export default Notification
