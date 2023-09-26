import { Input } from '@/client/components/UI/Input/Input';
import Modal from '@/client/components/UI/Modal/Modal';
import { useUser } from '@/client/contexts/UserProvider';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import useLocalStorage from 'use-local-storage';

const SignUp = () => {
  const [temporaryUserHash] = useLocalStorage<string | undefined>('temp-user-address', undefined);
  const { invalidateTemporaryUserHash, login, register } = useUser();
  const [name, setName] = useState<string>('');

  const handleNameInputChange = (event?: ChangeEvent<HTMLInputElement>) => {
    setName(event?.currentTarget?.value || '');
  };

  const handleClose = () => {
    invalidateTemporaryUserHash();
  };

  const handleConfirm = async () => {
    if (!name || name.length === 0) {
      toast.error('Please enter a name');
    }

    const registerSucceed = await register(temporaryUserHash!, name);
    if (!registerSucceed) {
      return;
    }

    const logged = await login();

    if (!logged) {
      toast.error('User registered but failed to log in');
      return;
    }

    toast.success('User registered and logged in. Redirecting to dashboard...');
  };

  return (
    <Modal
      cancelLabel="Go back to home"
      confirmLabel="Register name"
      isOpen={true}
      onCancel={handleClose}
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="flex flex-col">
        <h1 className="mb-1 text-sm font-semibold uppercase text-gray-400">
          User name registration
        </h1>
        <h1 className="text-md mb-3 font-medium text-white">Choose a name to start your bets</h1>
        <Input
          onChange={handleNameInputChange}
          placeholder="Lucker's name"
          type="text"
          value={name}
        />
      </div>
    </Modal>
  );
};

export default SignUp;
