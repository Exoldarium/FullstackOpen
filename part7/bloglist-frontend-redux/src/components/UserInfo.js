import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../reducers/loginReducer';
import { sortExistingBlogs } from '../reducers/blogReducer';
import { useLocation } from 'react-router-dom';

export default function UserInfo() {
  const dispatch = useDispatch();
  const location = useLocation();
  const loginData = useSelector(({ login }) => {
    if (login !== 'LOGIN') {
      return login
    }
  });

  console.log(location.pathname)

  function handleLogout() {
    dispatch(setUser('LOGIN'));
    window.localStorage.clear();
  }

  return (
    <>
      <div>
        <p>{loginData.name} logged in</p>
        <button onClick={handleLogout}>Log out</button>
        {location.pathname === '/blogs' &&
          <button onClick={() => dispatch(sortExistingBlogs())}>sort</button>}
      </div>
      {location.pathname === '/users' && <h1>Users</h1>}
    </>
  );
}
