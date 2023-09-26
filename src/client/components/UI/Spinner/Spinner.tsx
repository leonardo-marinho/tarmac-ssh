import SvgIcon from '@/client/components/UI/SvgIcon/SvgIcon';
import { SvgSizesType } from '@/client/components/UI/SvgIcon/SvgIcon.utils';
import classNames from 'classnames';
import { FC } from 'react';

export interface SpinnerProps {
  className?: string;
  size: SvgSizesType;
}

const Spinner: FC<SpinnerProps> = ({ className, size = 'medium' }) => {
  return (
    <SvgIcon
      aria-label={'spinner'}
      className={classNames(
        'text-gray aspect-square animate-spin cursor-wait overflow-hidden',
        className,
      )}
      icon="spinner"
      role={'status'}
      size={size}
    />
  );
};

export default Spinner;
