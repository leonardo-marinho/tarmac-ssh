import { GetManyDTO } from '@/server/types';

export type GetManyUserDTO = GetManyDTO<{
  ids?: string;
  usernames?: string;
  accountHashes?: string;
}>;
