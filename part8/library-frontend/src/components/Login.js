import { useMutation } from "@apollo/client";
import useForm from "../hooks/useForm"
import { LOGIN_MUTATION, USER_QUERY } from "../queries";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login({ setError, setToken }) {
  const navigate = useNavigate();
  const { inputs, handleInputs, clearForm } = useForm({
    username: '',
    password: ''
  });

  const [login, result] = useMutation(LOGIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: USER_QUERY }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      setError(messages);
    }
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem('userToken', token);
      setToken(token);
      navigate('/');
    }
  }, [result.data]);

  console.log(result)

  function handleLogin(e) {
    e.preventDefault();
    login();
    clearForm();
  }

  return (
    <div>
      <form className="form" onSubmit={handleLogin}>
        <label htmlFor="username">username</label>
        <input
          name="username"
          onChange={handleInputs}
          value={inputs.title}
        />
        <label htmlFor="password">password</label>
        <input
          name="password"
          type="password"
          onChange={handleInputs}
          value={inputs.author}
        />
        <button type="submit">log in</button>
      </form>
    </div>
  )
}