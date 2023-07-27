import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const router = useRouter();
  const usernameFromCookies = Cookies.get('username');

  if (!usernameFromCookies && router.pathname !== '/') {
    router.push('/');
  }

  return { isAuthenticated: !!usernameFromCookies };
};
