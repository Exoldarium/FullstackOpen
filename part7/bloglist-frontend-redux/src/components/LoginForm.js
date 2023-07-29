import useForm from '../utils/useForm';

export default function LoginForm({ handleLogin }) {
  const [inputs, formService] = useForm({
    username: '',
    password: '',
  });

  function userLogin(e) {
    e.preventDefault();
    handleLogin(inputs);
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