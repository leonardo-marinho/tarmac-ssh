import prisma from '@/lib/database/client';
import { CreateGameBetArgs } from '@/lib/models/dto/CreateGameBetArgs.dto';
import { GetManyGameBetArgs } from '@/lib/models/dto/GetManyGameBetArgs.dto';
import { IdArgs } from '@/lib/models/dto/IdArgs.dto';
import { UpdateGameBetArgs } from '@/lib/models/dto/UpdateGameBetArgs.dto';
import { createGameBetArgsSchema } from '@/lib/validations/CreateGameBetArgs.schema';
import { getManyGameBetArgsSchema } from '@/lib/validations/GetManyGameBetArgs.schema';
import { idArgsSchema } from '@/lib/validations/IdArgs.schema';
import { updateGameBetArgsSchema } from '@/lib/validations/UpdateGameBetArgs.schema';
import { HttpResponseCodesEnum } from '@/server/enums';
import { InternalServerErrorException } from '@/server/exceptions/InternalServerError.exception';
import { NotFoundException } from '@/server/exceptions/NotFound.exception';
import GameBetService from '@/server/services/GameBet.service';
import { InfinitePaginationType } from '@/server/types';
import { resolveInfinitePagination } from '@/server/utils/resolveInfinitePagination';
import { resolveInfinitePaginationResponse } from '@/server/utils/resolveInfinitePaginationResponse';
import { validateSchema } from '@/server/utils/validateSchema';
import { GameBet } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

class GameBetController {
  async create(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: CreateGameBetArgs = req.body;
    validateSchema<CreateGameBetArgs>(createGameBetArgsSchema, body);

    // const gameRound = await prisma.gameRound.findUnique({ where: { id: body.gameRoundId } });
    // const user = await prisma.user.findUnique({ where: { id: body.userId } });
    //
    // if (!gameRound || !user) {
    //   throw new NotFoundException('GameRound or User not found');
    // }

    const response = await prisma.gameBet.create({
      data: {
        contractHash: body.contractHash,
        gameRoundId: body.gameRoundId,
        userId: body.userId,
      },
    });

    // const response: GameBet = await GameBetService.create(body);

    if (!response) {
      throw new InternalServerErrorException(
        `GameBet, with gameRound ${body.gameRoundId}, could not be created`,
      );
    }

    res.status(HttpResponseCodesEnum.CREATED).json(resolveInfinitePaginationResponse(response));
  }

  async deleteById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: GameBet = await GameBetService.deleteById(Number(query.id!));

    if (!response) {
      throw new NotFoundException(`GameBet, with id ${query.id}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: GameBet | null = await GameBetService.getById(Number(query.id!));

    if (!response) {
      throw new NotFoundException(`GameBet, with id ${query.id!}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getMany(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: GetManyGameBetArgs = req.query;
    validateSchema<GetManyGameBetArgs>(getManyGameBetArgsSchema, query);
    const pagination: InfinitePaginationType = resolveInfinitePagination(req.query);
    const response: GameBet[] = await GameBetService.bulkSearch({ ...query }, pagination);
    res
      .status(HttpResponseCodesEnum.OK)
      .json(resolveInfinitePaginationResponse(response, pagination));
  }

  async updateGameBet(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: UpdateGameBetArgs = req.body;
    validateSchema<UpdateGameBetArgs>(updateGameBetArgsSchema, body);
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: GameBet = await GameBetService.updateGameBet(Number(query.id!), body);
    res.status(HttpResponseCodesEnum.OK).json(response);
  }
}

export default new GameBetController();
