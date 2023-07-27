import { useState } from 'react';
import PropTypes from 'prop-types';

export default function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function userLogin(e) {
    e.preventDefault();
    handleLogin({
      username,
      password,
    });
    setUsername('');
    setPassword('');
  }

  return (
    <form onSubmit={userLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={(e) => setUsername(e.target.value)}
          data-cy="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
          data-cy="password"
        />
      </div>
      <button type="submit" data-cy="loginButton">
        login
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
