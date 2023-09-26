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
    if (router.pathname === Paths.Home) {
      if (isLogged) {
        router.push(Paths.Dashboard);
      } else if (isRegisterPending) {
        router.push(Paths.SignUp);
      }
    } else if (router.pathname === Paths.SignUp) {
      if (isLogged) {
        router.push(Paths.Dashboard);
      } else if (!isRegisterPending) {
        router.push(Paths.Home);
      }
    } else if (!publicPaths.some((path) => path === router.pathname) && !isLogged) {
      toast.error('You must be logged in to access this page');
      router.push(Paths.Home);
    }
  }, [isLogged, isRegisterPending, router]);

  return children;
};
