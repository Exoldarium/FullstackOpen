import { useState } from "react";
import AddBook from "./components/AddBook";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import NotificationMessage from "./components/NotificationMessage";

export default function App() {
  const [errorMessage, setErrorMessage] = useState('');

  function notify(message) {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  return (
    <>
      <Nav />
      <NotificationMessage errorMessage={errorMessage} />
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addBook" element={<AddBook setError={notify} />} />
      </Routes>
    </>
  );
}