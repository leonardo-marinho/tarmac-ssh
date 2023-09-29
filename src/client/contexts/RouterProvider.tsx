import { Paths, publicPaths } from '@/client/constants';
import { useUser } from '@/client/contexts/UserProvider';
import { useRouter } from 'next/router';
import { createContext, FC, PropsWithChildren, useEffect } from 'react';
import { toast } from 'react-toastify';

interface RouterContextValues {}

export const UserContext = createContext<RouterContextValues>({} as RouterContextValues);

export const RouterProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isLogged, isRegisterPending } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!publicPaths.some((path) => path === router.pathname) && !isLogged) {
      toast.error('You must be logged in to access this page');
      router.push(Paths.Dashboard);
    }
  }, [isLogged, isRegisterPending, router]);

  return children;
};
