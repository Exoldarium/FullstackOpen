import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../reducers/userReducer';

export default function UserInfo() {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => {
    if (user !== 'USER') {
      return user
    }
  });

  function handleLogout() {
    dispatch(setUser('USER'));
    window.localStorage.clear();
  }

  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
