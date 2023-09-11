import { FindManyDTO } from '@/server/types';

export type FindManyUserDTO = FindManyDTO<{
  ids?: string;
  usernames?: string;
  accountHashes?: string;
}>;
