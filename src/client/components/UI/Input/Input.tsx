import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = ({ ...htmlInputProps }) => {
  return (
    <input
      {...htmlInputProps}
      className={classNames('w-full rounded px-3 py-1', htmlInputProps.className)}
    />
  );
};
