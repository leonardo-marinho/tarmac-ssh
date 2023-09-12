import type { AppProps } from 'next/app';

import '@/client/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="relative h-full w-full">
      <Component {...pageProps} />
    </div>
  );
}
