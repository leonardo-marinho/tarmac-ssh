import { GetManyDTO } from '@/server/types';

export type GetManyUserDTO = GetManyDTO<{
  accountHashes?: string;
  disabled?: string;
  ids?: string;
  usernames?: string;
}>;
