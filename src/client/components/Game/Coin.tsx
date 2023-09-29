import classNames from 'classnames';
import { FC, ReactNode, useMemo } from 'react';

type CoinColors = 'black' | 'red' | 'white';

interface CoinProps {
  active?: boolean;
  color: CoinColors;
  small?: boolean;
  value?: ReactNode;
}

export const Coin: FC<CoinProps> = ({ active = false, color, small, value }) => {
  const colorClassName = useMemo(() => {
    let colorClassName = 'border-white text-black';
    if (color === 'black') colorClassName = 'bg-black/[.4] text-white';
    if (color === 'red') colorClassName = 'bg-white/[.5] text-white';

    if (active) colorClassName += ' !border-yellow-300 border-4';

    return colorClassName;
  }, [active, color]);

  return (
    <div
      className={classNames(
        'flex h-20 w-1/5  items-center justify-center opacity-95 shadow-2xl',
        colorClassName,
        { ['!h-8 !w-8 rounded-full']: small },
      )}
    >
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
};
