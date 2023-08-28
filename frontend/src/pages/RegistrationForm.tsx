import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/Modal/Modal';
import useStores from '@/hooks/useStores';

const RegistrationForm: React.FC = observer(() => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState<boolean>(true);

  const { authStore } = useStores();

  const router = useRouter();

  const handleRegister = async () => {
    await authStore.register(username, password);
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
          disabled={authStore.state?.isLoading}
          isLoading={authStore.state?.isLoading}
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
