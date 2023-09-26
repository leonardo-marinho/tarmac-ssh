import { GetManyDTO } from '@/server/types';

export type GetManyUserArgs = GetManyDTO<{
  disabled?: string;
  hashes?: string;
  ids?: string;
  usernames?: string;
}>;
