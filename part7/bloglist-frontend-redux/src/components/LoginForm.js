import { useDispatch } from 'react-redux';
import useForm from '../utils/useForm';
import { initializeLogin, setUser } from '../reducers/loginReducer';
import blogService from '../services/blogs';
import { useEffect } from 'react';

export default function LoginForm() {
  const dispatch = useDispatch();
  const [inputs, formService] = useForm({
    username: '',
    password: '',
  });

  useEffect(() => {
    // we grab our user details from local storage so that user stays logged in
    const loggedUser = localStorage.getItem('loginCredentials');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  function userLogin(e) {
    e.preventDefault();
    dispatch(initializeLogin(inputs));
  }

  return (
    <form onSubmit={userLogin}>
      <div>
        username
        <input
          type="text"
          value={inputs.username}
          name="username"
          onChange={formService.getInputs}
          data-cy="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={inputs.password}
          name="password"
          onChange={formService.getInputs}
          data-cy="password"
        />
      </div>
      <button type="submit" data-cy="loginButton">
        login
      </button>
    </form>
  );
}