import { useState } from "react";

export default function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function userLogin(e) {
    e.preventDefault();
    handleLogin({
      username,
      password
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
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}