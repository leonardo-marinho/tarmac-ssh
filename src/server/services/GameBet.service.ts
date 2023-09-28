import prisma from '@/lib/database/client';
import { IdType, InfinitePaginationType } from '@/server/types';
import { resolveBulkArgs } from '@/server/utils/resolveBulkArgs';
import { resolvePrismaPaginationArgs } from '@/server/utils/resolvePrismaPaginationArgs';
import { GameBet, Prisma } from '@prisma/client';

interface GameBetBulkSearchArgs extends Prisma.GameBetWhereInput {
  contractHashes?: string;
  gameRoundIds?: string;
  ids?: string;
  userIds?: string;
}

class GameBetService {
  async bulkSearch(
    { contractHashes, gameRoundIds, ids, userIds, ...nonBulkSearchArgs }: GameBetBulkSearchArgs,
    pagination: InfinitePaginationType,
  ): Promise<GameBet[]> {
    const whereArgs = resolveBulkArgs<Prisma.GameBetWhereInput>(
      [
        {
          key: 'id',
          value: ids,
        },
        {
          key: 'gameRoundId',
          value: gameRoundIds,
        },
        {
          key: 'userId',
          value: userIds,
        },
        {
          key: 'contractHash',
          value: contractHashes,
        },
      ],
      nonBulkSearchArgs,
    );

    const gameBets = await prisma.gameBet.findMany({
      where: whereArgs,
      ...resolvePrismaPaginationArgs(pagination),
    });

    return gameBets;
  }

  async create(data: Prisma.GameBetCreateInput): Promise<GameBet> {
    const response: GameBet | null = await prisma.gameBet.create({
      data,
    });

    return response;
  }

  async deleteById(id: IdType): Promise<GameBet> {
    let response: GameBet | null = null;

    response = await prisma.gameBet.delete({
      where: {
        id: id,
      },
    });

    return response;
  }

  // async exists(contractHash: HashType): Promise<boolean> {
  //   return !!(await prisma.gameBet.findUnique({
  //     where: {
  //       contractHash,
  //     },
  //   }));
  // }
  //
  // async getByHash(contractHash: HashType): Promise<GameBet | null> {
  //   let response: GameBet | null = null;
  //
  //   response = await prisma.gameBet.findUnique({
  //     where: {
  //       contractHash,
  //     },
  //   });
  //
  //   return response;
  // }

  async getById(id: number): Promise<GameBet | null> {
    const response: GameBet | null = await prisma.gameBet.findUnique({
      where: {
        id,
      },
    });

    return response;
  }

  async updateGameBet(id: IdType, data: Prisma.GameBetUpdateInput): Promise<GameBet> {
    const response: GameBet = await prisma.gameBet.update({
      data,
      where: {
        id: id,
      },
    });

    return response;
  }
}

export default new GameBetService();
