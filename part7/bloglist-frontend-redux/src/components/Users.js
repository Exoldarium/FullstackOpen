import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeUsers } from '../reducers/userReducer';

export default function User() {
  const dispatch = useDispatch()
  const users = useSelector(({ users }) => {
    return users
  });

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);
  console.log(users)
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