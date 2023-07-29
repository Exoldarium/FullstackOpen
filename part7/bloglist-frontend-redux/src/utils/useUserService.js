import { useState } from 'react';

export default function useUserService() {
  const [user, setUser] = useState('');

  function logout() {
    window.localStorage.clear();
    setUser('');
  }

  const service = {
    logout,
    setUser
  }

  return [
    user,
    service,
  ]
}