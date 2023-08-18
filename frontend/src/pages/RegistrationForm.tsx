import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import authStore from '@/store/AuthStore/AuthStore';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/Modal/Modal';

const RegistrationForm: React.FC = observer(() => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState<boolean>(true);

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

  const handleModalClose = () => {
    setModalOpen(false);
    router.push('/');
  };

  return isModalOpen ? (
    <Modal
      onClose={handleModalClose}
      title="Registration Form"
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
          type="password"
          value={password}
        />
        <Button
          className="w-full mt-24"
          onClick={handleRegister}
          variant="primary"
        >
          Register
        </Button>
      </form>
    </Modal>
  ) : null;
});

export default RegistrationForm;
