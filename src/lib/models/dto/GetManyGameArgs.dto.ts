import { GetManyDTO } from '@/server/types';

export type GetManyGameArgs = GetManyDTO<{
  ids?: string;
  names?: string;
}>;
