import { FindManyDTO } from '@/server/types';
import { User } from '@prisma/client';

export type FindManyUserDTO = FindManyDTO<{
  ids?: string[];
  usernames?: string[];
  accountHashes?: string[];
}>;
