import { useState } from 'react';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });
  const [loading, setLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  return { isLoggedIn, loading, logout, checkAuth };
}