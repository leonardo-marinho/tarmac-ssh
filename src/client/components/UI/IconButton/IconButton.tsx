import Button, { ButtonProps } from '@/client/components/UI/Button/Button';
import { FC } from 'react';

interface IconButtonProps extends Omit<ButtonProps, 'label'> {}

export const IconButton: FC<IconButtonProps> = ({ ...buttonProps }) => {
  return <Button {...buttonProps} label="" />;
};
