import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import Button from '../components/ui/Button/Button';
import authStore from '../store/AuthStore/AuthStore';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const onSignInClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/LoginForm');
  }, [router]);

  const onSignUpClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/RegistrationForm');
  }, [router]);

  return (
    <>
      {!authStore.isAuthenticated && (
        <section className="p-4 flex justify-end">
          <Button
            onClick={onSignInClick}
            variant="secondary"
          >
            Sign In
          </Button>
          <Button
            onClick={onSignUpClick}
            variant="primary"
          >
            Sign Up
          </Button>
        </section>
      )}
      {children}
    </>
  );
};

export default observer(AuthLayout);
