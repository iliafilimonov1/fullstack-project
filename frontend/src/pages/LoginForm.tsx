import React, { useState } from 'react';
import { useRouter } from 'next/router';
import authStore from '@/store/AuthStore/AuthStore';
import Modal from '@/components/ui/Modal/Modal';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState<boolean>(true);

  const router = useRouter();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await authStore.login(username, password);
    router.push('/');
  };

  const handleModalClose = () => {
    setModalOpen(false);
    router.push('/');
  };

  return isModalOpen ? (
    <Modal
      onClose={handleModalClose}
      title="Login Form"
    >
      <form>
        <Input
          className="mb-4"
          label="Your login"
          onChange={(e) => setUsername(e)}
          value={username}
        />
        <Input
          className="mb-4"
          label="Your password"
          onChange={(e) => setPassword(e)}
          value={password}
        />
        <Button
          className="w-full mt-24"
          onClick={handleLogin}
          variant="primary"
        >
          Login
        </Button>
      </form>
    </Modal>
  ) : null;
};

export default LoginForm;
