import { Link } from 'react-router-dom';
import { NavStyles } from '../styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link to="/blogs" className="linkNav">blogs</Link>
      <Link to="/create" className="linkNav">create</Link>
      <Link to="/users" className="linkNav">users</Link>
    </NavStyles>
  )
}