import { Link } from 'react-router-dom';

export default function Users({ users }) {
  return (
    <div>
      {users.map(user => (
        <Link to={`/users/${user.id}`} key={user.id}>
          <p>{user.name} blogs created {user.blogs.length}</p>
        </Link>
      ))}
    </div>
  )
}