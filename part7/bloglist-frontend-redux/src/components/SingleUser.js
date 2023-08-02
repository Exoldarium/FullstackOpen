import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useMatch } from 'react-router-dom';
import { initializeSpecificUser } from '../reducers/userReducer';

export default function SingleUser({ users }) {
  const match = useMatch('/users/:id');

  const location = useLocation();
  return (
    <div>
      <p>name</p>
      <h1>added blogs</h1>
      {/* {user.blogs.map(blog => {
        <p>{blog.title}</p>
      })} */}
    </div>
  )
}