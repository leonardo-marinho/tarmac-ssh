import { GetManyDTO } from '@/server/types';

export type GetManyUserTransactionDTO = GetManyDTO<{
  amount?: string;
  contractHashes?: string;
  ids?: string;
  userId?: string;
}>;
