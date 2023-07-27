import axios from 'axios';
import { useState } from 'react';

const baseUrl = '/api/login';

export default function useUserService(initialState = {}) {
  const [userLogin, setUserLogin] = useState(initialState);
  const [user, setUser] = useState('');

  async function login(credentials) {
    const res = await axios.post(baseUrl, credentials);
    window.localStorage.setItem('loginCredentials', JSON.stringify(res.data));
    setUser(res.data);
  };

  function logout() {
    window.localStorage.clear();
    setUser('');
  }

  const service = {
    login,
    logout
  }

  return [
    user,
    service,
    setUser
  ]
}