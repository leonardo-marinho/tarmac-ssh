import InlineNav from '@/client/components/UI/InlineNav/InlineNav';
import InlineNavItem from '@/client/components/UI/InlineNavItem/InlineNavItem';
import Link from '@/client/components/UI/Link/Link';
import { FC } from 'react';

const Landing: FC = () => {
  return (
    <div className="h-full w-full">
      <header className="absolute left-0 top-0 flex h-14 w-full flex-row justify-end px-20">
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
      <main className="flex h-full w-full cursor-default items-center justify-between pt-14">
        <div className="relative flex w-full flex-row justify-between px-20">
          <div className="flex w-96 flex-col">
            <h1 className="text-7xl font-bold text-white">
              Here misfortune and lucks go hand in hand!
            </h1>
            <p className="font-light text-neutral-400">
              Get ready for an unbelievable journey of luck and misfortune. Who knows, you might be
              the next lucky winner! Your bets are securely insured by Ethereum smart contracts.
            </p>
          </div>
          <div className="flex cursor-default flex-col justify-end">
            <h1 className="w-96 text-right text-9xl font-bold text-neutral-100 opacity-10">
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
