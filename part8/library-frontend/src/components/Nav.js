import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="navDiv">
      <Link to="/authors" className="navLink">authors</Link>
      <Link to="/books" className="navLink">books</Link>
      <Link to="/addBook" className="navLink">addBook</Link>
    </div>
  )
}