import { Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { useUser } from "../hooks/useUser";

export default function Nav({ token, setToken }) {
  const user = useUser();
  const client = useApolloClient();

  function logOut() {
    localStorage.clear();
    client.resetStore();
    setToken('');
  }

  return (
    <div className="navDiv">
      <Link to="/" className="navLink">authors</Link>
      <Link to="/books" className="navLink">books</Link>
      {(user || token) && <Link to="/addBook" className="navLink">addBook</Link>}
      {user || token ?
        <Link to="/" className="navLink" onClick={logOut}>log out</Link>
        :
        <Link to="/login" className="navLink">login</Link>}
    </div>
  )
}