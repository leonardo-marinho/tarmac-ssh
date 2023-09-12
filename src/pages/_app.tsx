import type { AppProps } from 'next/app';

import '@/client/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full h-full relative">
      <Component {...pageProps} />
    </div>
  );
}
