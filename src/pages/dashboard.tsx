import { BetCard } from '@/client/components/BetCard/BetCard';
import { Game } from '@/client/components/Game/Game';
import { NavBar } from '@/client/components/NavBar/NavBar';
import { TopBar } from '@/client/components/TopBar/TopBar';
import { useUser } from '@/client/contexts/UserProvider';
import { FC } from 'react';

const Dashboard: FC = () => {
  const { login, refill, totalCash, userName } = useUser();

  const handleConnectMetaMaskButtonClick = async () => {
    await login();
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex w-[1400px] flex-col items-center justify-center rounded-3xl bg-gradient-to-t from-special5 to-special1">
        <TopBar
          money={totalCash}
          onLogin={handleConnectMetaMaskButtonClick}
          onRefill={refill}
          userName={userName}
        />
        <NavBar />
        <div className="flex h-[720px] w-[1020px] flex-col items-center justify-center gap-12 p-7 ">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="flex flex-1 ">
                <BetCard totalCash={totalCash} />
              </div>
              <div className="flex flex-[2]">
                <Game />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
