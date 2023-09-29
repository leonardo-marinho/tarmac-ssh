'use client';

import { coinNumbers } from '@/client/constants';
import { FC, useEffect, useMemo, useState } from 'react';

import { Coin } from './Coin';

export const Game: FC = () => {
  const [activeCoinIndex, setActiveCoinIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('activeCoinIndex', activeCoinIndex);
      setActiveCoinIndex((prev) => {
        if (prev === coinNumbers.length - 1) return 0;
        return prev + 1;
      });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  });

  const coins = useMemo(() => {
    let pickedCoins = coinNumbers.slice(activeCoinIndex, activeCoinIndex + 5);
    if (pickedCoins.length < 5) {
      pickedCoins = [...pickedCoins, ...coinNumbers.slice(0, 5 - pickedCoins.length)];
    }

    return pickedCoins.map((coinNumber, idx) => (
      <Coin
        active={idx === 2}
        color={coinNumber % 2 ? 'black' : 'red'}
        key={idx}
        value={coinNumber}
      />
    ));
  }, [activeCoinIndex]);

  return (
    <div className="flex h-full w-full flex-[2] flex-col justify-between px-7 py-7">
      <div className="flex flex-row justify-between">
        <span className="text-sm font-bold uppercase text-white opacity-60">Game</span>
      </div>
      <div className="flex flex-wrap items-center justify-between">{coins}</div>
      <div className="mt-6 flex flex-col border-t border-t-white/[.2] pt-4">
        <span className="mb-4 text-sm font-bold uppercase text-white opacity-60">Results</span>
        <Coin color="red" small />
      </div>
    </div>
  );
};
