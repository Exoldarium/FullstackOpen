import { useContext, useReducer } from "react";
import { createContext } from "react";
import { messageReducer } from "./reducers/messageReducer";

const Context = createContext();

export default function ContextProvider(props) {
  const [message, dispatch] = useReducer(messageReducer);
  console.log({ context: message })

  return (
    <Context.Provider value={[message, dispatch]}>
      {props.children}
    </Context.Provider>
  )
}

export function useMessageValue() {
  const messageAndDispatch = useContext(Context);
  return messageAndDispatch[0];
}

export function useDispatchValue() {
  const messageAndDispatch = useContext(Context);
  return messageAndDispatch[1];
}