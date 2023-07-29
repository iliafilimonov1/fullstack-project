import React from 'react';
import { useRouter } from 'next/router';
import Button from '../components/ui/Button/Button';
import { useAuth } from '../hooks/useAuth';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  /**
   * Обработчик нажатия на кнопку "Sign In".
   * Перенаправляет пользователя на страницу входа.
   *
   * @function
   */
  const onSignInClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/LoginForm');
  };

  /**
   * Обработчик нажатия на кнопку "Sign Up".
   * Перенаправляет пользователя на страницу регистрации.
   *
   * @function
   */
  const onSignUpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/RegistrationForm');
  };

  return (
    <section className="p-4">
      {!isAuthenticated && (
        <div className="flex justify-end">
          <Button variant="secondary" onClick={onSignInClick}>
            Sign In
          </Button>
          <Button variant="primary" onClick={onSignUpClick}>
            Sign Up
          </Button>
        </div>
      )}
      {children}
    </section>
  );
};

export default React.memo(AuthLayout);
