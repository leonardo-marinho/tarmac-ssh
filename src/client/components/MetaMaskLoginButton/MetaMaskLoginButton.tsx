import Button from '@/client/components/UI/Button/Button';
import { FC } from 'react';

interface MetaMaskLoginButtonProps {
  onClick: () => void;
}

const MetaMaskLoginButton: FC<MetaMaskLoginButtonProps> = ({ onClick }) => {
  return (
    <Button
      className="h-8 !text-black opacity-90 transition hover:opacity-100"
      icon="metaMask"
      iconPosition="right"
      iconViewBox="0 0 256 256"
      onClick={onClick}
      size="small"
    >
      Connect with MetaMask
    </Button>
  );
};

export default MetaMaskLoginButton;
