import { useState } from "react";
import AddBook from "./components/AddBook";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import NotificationMessage from "./components/NotificationMessage";
import EditAuthor from "./components/EditAuthor";
import Login from "./components/Login";
import { useUser } from "./hooks/useUser";

export default function App() {
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');
  const user = useUser();

  function notify(message) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  }

  return (
    <>
      <Nav token={token} setToken={setToken} />
      <NotificationMessage errorMessage={errorMessage} />
      <Routes>
        <Route path="/" element={
          <>
            <Authors />
            {(user || token) && <EditAuthor setError={notify} />}
          </>
        } />
        <Route path="/books" element={<Books />} />
        {(user || token) && <Route path="/addBook" element={<AddBook setError={notify} />} />}
        <Route path="/login" element={!user && <Login setError={notify} setToken={setToken} />} />
      </Routes>
    </>
  );
}