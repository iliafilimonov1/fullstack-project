import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import authStore from '@/store/AuthStore/AuthStore';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';

const RegistrationForm: React.FC = observer(() => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const handleRegister = async () => {
    try {
      await authStore.register(username, password);
      router.push('/');
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null) {
        console.error('An error occurred:', (error as Error).message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 absolute top-0 left-0 right-0">
      <div className="bg-white p-8 shadow-lg rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
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
            onClick={handleRegister}
            variant="primary"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
});

export default RegistrationForm;
