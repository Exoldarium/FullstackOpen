import axios from 'axios';
import { useState } from 'react';

const baseUrl = '/api/login';

export default function useUserService() {
  const [user, setUser] = useState('');

  async function login(credentials) {
    try {
      const res = await axios.post(baseUrl, credentials);
      window.localStorage.setItem('loginCredentials', JSON.stringify(res.data));
      setUser(res.data);
    } catch (err) {
      return err
    }
  };

  function logout() {
    window.localStorage.clear();
    setUser('');
  }

  const service = {
    login,
    logout,
    setUser
  }

  return [
    user,
    service,
  ]
}