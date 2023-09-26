import Spinner from '@/client/components/UI/Spinner/Spinner';
import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner size="large" />
    </div>
  );
};

export default Loading;
