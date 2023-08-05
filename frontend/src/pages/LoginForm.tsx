import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import authStore from '@/store/AuthStore/AuthStore';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';

const LoginForm: React.FC = observer(() => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await authStore.login(username, password);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 absolute top-0 left-0 right-0">
      <div className="bg-white p-8 shadow-lg rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login form</h2>
        <form>
          <div className="mb-4">
            <Input
              label="Your login"
              onChange={(e) => setUsername(e)}
              value={username}
            />
          </div>
          <div className="mb-4">
            <Input
              label="Your password"
              onChange={(e) => setPassword(e)}
              value={password}
            />
          </div>
          <Button
            onClick={handleLogin}
            variant="primary"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
});

export default LoginForm;
