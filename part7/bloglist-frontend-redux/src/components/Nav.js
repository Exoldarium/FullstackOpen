import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <>
      <Link to="/blogs">blogs</Link>
      <Link to="/create">create</Link>
      <Link to="/users">users</Link>
    </>
  )
}