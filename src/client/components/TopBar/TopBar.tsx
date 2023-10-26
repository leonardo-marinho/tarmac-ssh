import { MONEY_SYMBOL } from '@/client/constants';
import { moneyToText } from '@/client/utils/moneyToText';
import { FC } from 'react';

import MetaMaskLoginButton from '../MetaMaskLoginButton/MetaMaskLoginButton';
import Button from '../UI/Button/Button';
import SvgIcon from '../UI/SvgIcon/SvgIcon';

interface TopBarProps {
  money?: number;
  onLogin: () => void;
  onRefill?: () => void;
  userName?: string;
}

export const TopBar: FC<TopBarProps> = ({ money = 0, onLogin, onRefill, userName }) => {
  return (
    <div className="absolute left-0 top-0 flex h-16 w-full items-end justify-end gap-8 px-10 text-sm text-white">
      {userName ? (
        <>
          {money === 0 ||
            (true && (
              <Button
                className="h-6 !text-black opacity-90 transition hover:opacity-100"
                onClick={onRefill}
                size="small"
              >
                Refill
              </Button>
            ))}
          <span className="tracking-wider opacity-60 ">{moneyToText(money, MONEY_SYMBOL)}</span>
          <span className="flex items-center gap-2 opacity-60 ">
            {userName}
            <SvgIcon color="#fff" icon="profile" size="small" />
          </span>
        </>
      ) : (
        <MetaMaskLoginButton onClick={onLogin} />
      )}
    </div>
  );
};
