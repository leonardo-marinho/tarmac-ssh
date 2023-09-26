import { HashType } from '@/server/types';

export interface AuthSignUpArgs {
  hash: HashType;
  username: string;
}
