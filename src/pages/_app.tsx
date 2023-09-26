import type { AppProps } from 'next/app';

import { RouterProvider } from '@/client/contexts/RouterProvider';
import { UserProvider } from '@/client/contexts/UserProvider';
import '@/client/styles/globals.css';
import { dehydrate, Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: {},
  };
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <RouterProvider>
            <div className="relative h-full w-full">
              <Component {...pageProps} />
              <ToastContainer />
            </div>
          </RouterProvider>
        </Hydrate>
      </UserProvider>
    </QueryClientProvider>
  );
}
