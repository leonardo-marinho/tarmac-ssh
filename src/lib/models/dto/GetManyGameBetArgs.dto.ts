import { GetManyDTO } from '@/server/types';

export type GetManyGameBetArgs = GetManyDTO<{
  contractHashes?: string;
  gameRoundIds?: string;
  ids?: string;
  names?: string;
  userIds?: string;
}>;
