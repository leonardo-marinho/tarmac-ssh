import { QueryKeys, REFETCH_INTERVAL } from '@/client/constants';
import AuthApi from '@/client/services/AuthApi.service';
import { AuthSignInResponse } from '@/lib/models/dto/AuthSignInResponse.dto';
import { AuthSignUpArgs } from '@/lib/models/dto/AuthSignUpArgs.dto';
import { HttpResponseCodesEnum } from '@/server/enums';
import { ControllerErrorResponseType, HashType } from '@/server/types';
import { ethers } from 'ethers';
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import useLocalStorage from 'use-local-storage';

import TransactionApi from '../services/TransactionApi.service';

interface UserContextValues {
  invalidateTemporaryUserHash: () => void;
  isLogged: boolean;
  isRegisterPending: boolean;
  login: () => Promise<boolean | null>;
  refill: () => Promise<boolean>;
  register: (hash: HashType, name: string) => Promise<boolean>;
  totalCash?: number;
  userName?: string;
}

export const UserContext = createContext<UserContextValues>({} as UserContextValues);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userAmount, setUserAmount] = useState<number>();

  const [userName, setUserName] = useLocalStorage<string | undefined>('user-name', undefined);
  const [userHash, setUserHash] = useLocalStorage<string | undefined>('user-hash', undefined);
  const [temporaryUserHash, setTemporaryUserHash] = useLocalStorage<string | undefined>(
    'temp-user-address',
    undefined,
  );
  const [accessToken, setAccessToken] = useLocalStorage<string | undefined>(
    'access-token',
    undefined,
  );
  const { mutateAsync: signUp } = useMutation<boolean, ControllerErrorResponseType, AuthSignUpArgs>(
    QueryKeys.SignUp,
    AuthApi.signUp.bind(AuthApi),
  );
  const { mutateAsync: signIn } = useMutation(QueryKeys.SignIn, AuthApi.signIn.bind(AuthApi));
  const { mutateAsync: refill } = useMutation(QueryKeys.Refill, () =>
    TransactionApi.refill({ hash: userHash! }),
  );
  const { data, isError, isLoading } = useQuery({
    enabled: !!userHash,
    queryFn: () => TransactionApi.getTotalAmountByUser({ hash: userHash! }),
    queryKey: QueryKeys.UserAmount,
    refetchInterval: REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (isLoading || isError) return;
    setUserAmount(data as number);
  }, [data, isError, isLoading]);

  const login = async (): Promise<boolean | null> => {
    setTemporaryUserHash(undefined);
    let hash: string | undefined = undefined;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      hash = await signer.getAddress();
      const response = await signIn({ hash });
      if (!(response as AuthSignInResponse)?.accessToken) {
        const signInError: ControllerErrorResponseType =
          response as unknown as ControllerErrorResponseType;
        if (signInError.httpResponseCode === HttpResponseCodesEnum.UNAUTHORIZED) {
          setTemporaryUserHash(hash);
          return null;
        }
      }

      setAccessToken((response as AuthSignInResponse).accessToken);
      setUserName((response as AuthSignInResponse).user.username);
      setUserHash((response as AuthSignInResponse).user.hash);
      return true;
    } catch (error) {
      setAccessToken(undefined);
      toast.error('Error connecting to MetaMask');
    }

    return false;
  };

  const register = async (hash: HashType, username: string): Promise<boolean> => {
    const registered = await signUp({ hash, username });

    if (registered) {
      return (await login()) === true;
    }

    toast.error('Error registering user');
    return false;
  };

  const invalidateTemporaryUserHash = () => {
    setTemporaryUserHash(undefined);
  };

  return (
    <UserContext.Provider
      value={{
        invalidateTemporaryUserHash,
        isLogged: !!accessToken,
        isRegisterPending: !!temporaryUserHash,
        login,
        refill: async () => refill(),
        register,
        totalCash: userAmount,
        userName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextValues => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('UserHook must be used within an UserProvider');
  }

  return context;
};
