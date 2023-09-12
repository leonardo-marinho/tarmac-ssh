import InlineNav from '@/client/components/UI/InlineNav/InlineNav';
import InlineNavItem from '@/client/components/UI/InlineNavItem/InlineNavItem';
import Link from '@/client/components/UI/Link/Link';
import { FC } from 'react';

const Landing: FC = () => {
  return (
    <div className="h-full w-full">
      <header className="absolute h-14 flex flex-row justify-end px-20 w-full top-0 left-0">
        <InlineNav>
          <InlineNavItem>
            <Link external href="https://github.com/leonardo-marinho/tarmac-ssh">
              Repo
            </Link>
          </InlineNavItem>
          <InlineNavItem>
            <Link href="/about">About</Link>
          </InlineNavItem>
          <InlineNavItem className="font-medium text-neutral-400">Sign in</InlineNavItem>
        </InlineNav>
      </header>
      <main className="flex cursor-default h-full items-center pt-14 justify-between w-full">
        <div className="px-20 flex flex-row relative w-full justify-between">
          <div className="flex flex-col w-96">
            <h1 className="text-white font-bold text-7xl">
              Here misfortune and lucks go hand in hand!
            </h1>
            <p className="text-neutral-400 font-light">
              Get ready for an unbelievable journey of luck and misfortune. Who knows, you might be
              the next lucky winner! Your bets are securely insured by Ethereum smart contracts.
            </p>
          </div>
          <div className="cursor-default flex flex-col justify-end">
            <h1 className="text-neutral-100 opacity-10 font-bold text-9xl text-right w-96">
              BET NOW!
            </h1>
          </div>
        </div>
      </main>
      <footer>
        <p></p>
      </footer>
    </div>
  );
};

export default Landing;
