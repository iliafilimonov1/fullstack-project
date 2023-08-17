import { useRouter } from 'next/router';
import { useEffect } from 'react';
import authStore from '../store/AuthStore/AuthStore';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = authStore;

  useEffect(() => {
    if (!isAuthenticated && router.pathname !== '/LoginForm' && router.pathname !== '/RegistrationForm') {
      router.push('/');
    }
  }, [isAuthenticated]);

  return children;
};

export default ProtectedRoute;
