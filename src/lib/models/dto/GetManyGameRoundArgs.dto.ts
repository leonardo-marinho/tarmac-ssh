import { GetManyDTO } from '@/server/types';

export type GetManyGameRoundArgs = GetManyDTO<{
  gameIds?: string;
  ids?: string;
}>;
