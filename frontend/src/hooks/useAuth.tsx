import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const usernameFromCookies = Cookies.get('username');
    setIsAuthenticated(!!usernameFromCookies);
  }, []);

  const logout = () => {

    Cookies.remove('username');
    setIsAuthenticated(false);

    router.push('/LoginForm');
  };

  return { isAuthenticated, logout };
};
