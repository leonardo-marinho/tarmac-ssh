import { GetManyDTO } from '@/server/types';

export type GetManyUserDTO = GetManyDTO<{
  accountHashes?: string;
  ids?: string;
  usernames?: string;
}>;
