import { User } from '@prisma/client';

export interface AuthSignInResponse {
  accessToken: string;
  user: User;
}
