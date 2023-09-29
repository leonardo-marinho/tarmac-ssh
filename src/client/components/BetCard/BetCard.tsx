import { MONEY_SYMBOL } from '@/client/constants';
import { moneyToText } from '@/client/utils/moneyToText';
import { textToMoney } from '@/client/utils/textToMoney';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';

interface BetCardProps {
  totalCash?: number;
}

export const BetCard: FC<BetCardProps> = ({ totalCash }) => {
  const [betAmount, setBetAmount] = useState<number | undefined>(undefined);

  const onBetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const moneyText = textToMoney(e.target.value);

    if (isNaN(Number(moneyText))) {
      return;
    }

    const value = Number(moneyText);
    if (!totalCash) {
      setBetAmount(0);
      return;
    } else if (value > totalCash) {
      toast.warn(
        `Bet amount (${moneyToText(
          value,
          MONEY_SYMBOL,
          0,
        )}) cannot be higher than available cash (${moneyToText(totalCash, MONEY_SYMBOL, 0)})`,
      );
    }

    setBetAmount(value);
  };

  return (
    <div className="flex aspect-[0.8] w-auto flex-col justify-between p-7">
      <div className="flex flex-row justify-between">
        <span className="text-sm font-bold uppercase text-white opacity-60">Enter your bet</span>
      </div>
      <div className="relative flex w-auto flex-col items-center justify-center">
        <Input
          className="text-center text-7xl font-bold text-white drop-shadow-md placeholder:text-slate-300"
          onChange={onBetInputChange}
          placeholder={'Insert a value'}
          value={moneyToText(betAmount, MONEY_SYMBOL, 0)}
        />
        <span className="text-base font-bold uppercase tracking-wider text-white opacity-60">
          {moneyToText(totalCash, MONEY_SYMBOL)} available
        </span>
      </div>
      <Button
        className="mt-10 text-2xl font-bold uppercase drop-shadow-md"
        disabled={!betAmount || !totalCash || betAmount > totalCash}
      >
        Place bet
      </Button>
      {/* <div className="flex flex-col items-center justify-center">
        <span className="text-special3 text-4xl font-bold uppercase drop-shadow-md">{moneyToText(620.54, MONEY_SYMBOL)}</span>
        <span className="text-white text-base font-normal drop-shadow-md">In game</span>
      </div> */}
    </div>
  );
};
