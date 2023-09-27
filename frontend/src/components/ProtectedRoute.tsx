import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useStores from '@/hooks/useStores';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { authStore } = useStores();

  console.log(router);

  useEffect(() => {
    if (!authStore.isAuthenticated && !['/LoginForm', '/RegistrationForm'].includes(router.pathname)) {
      router.push('/');
    }
  }, [authStore.isAuthenticated, router]);

  return children;
};

export default ProtectedRoute;
