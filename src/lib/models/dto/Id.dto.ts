import { FindManyDTO } from '@/server/types';

export type IdDTO = FindManyDTO<{
  id?: string;
}>;
