import Link from '@/client/components/UI/Link/Link';
import { Paths } from '@/client/constants';
import { FC } from 'react';

import SvgIcon from '../UI/SvgIcon/SvgIcon';

export const NavBar: FC = () => {
  return (
    <div className="absolute left-0 top-0 flex h-full w-20 flex-col justify-center">
      <div className="flex h-5/6 w-full flex-col items-end justify-between border-r border-r-white/[.2] pr-7">
        <div className="flex flex-col" />
        <div className="flex flex-col gap-8">
          <span className="cursor-pointer opacity-50 hover:opacity-100">
            <Link href={Paths.Dashboard}>
              <SvgIcon color="#fff" icon="play" size="medium" />
            </Link>
          </span>
          <span className="cursor-pointer opacity-50 hover:opacity-100">
            <Link href={Paths.MyTransactions}>
              <SvgIcon color="#fff" icon="playlist" size="medium" />
            </Link>
          </span>
          <span className="cursor-pointer opacity-50 hover:opacity-100">
            <Link href={Paths.Leaderboard}>
              <SvgIcon color="#fff" icon="equalizer" size="medium" />
            </Link>
          </span>
        </div>
        <div className="flex flex-col" />
      </div>
    </div>
  );
};
