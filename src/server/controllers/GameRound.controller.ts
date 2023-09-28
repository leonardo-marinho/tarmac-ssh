import prisma from '@/lib/database/client';
import { CreateGameRoundArgs } from '@/lib/models/dto/CreateGameRoundArgs.dto';
// import {CreateUserTransactionArgsDto} from "@/lib/models/dto/CreateUserTransactionArgs.dto";
import { GetManyGameRoundArgs } from '@/lib/models/dto/GetManyGameRoundArgs.dto';
import { IdArgs } from '@/lib/models/dto/IdArgs.dto';
import { UpdateGameRoundArgs } from '@/lib/models/dto/UpdateGameRoundArgs.dto';
import { createGameRoundArgsSchema } from '@/lib/validations/CreateGameRoundArgs.schema';
// import {createUserTransactionArgsSchema} from "@/lib/validations/CreateUserTransactionArgs.schema";
import { getManyGameRoundArgsSchema } from '@/lib/validations/GetManyGameRoundArgs.schema';
import { idArgsSchema } from '@/lib/validations/IdArgs.schema';
import { updateGameRoundArgsSchema } from '@/lib/validations/UpdateGameRoundArgs.schema';
import { HttpResponseCodesEnum } from '@/server/enums';
import { InternalServerErrorException } from '@/server/exceptions/InternalServerError.exception';
import { NotFoundException } from '@/server/exceptions/NotFound.exception';
// import GameService from "@/server/services/Game.service";
import GameRoundService from '@/server/services/GameRound.service';
import { InfinitePaginationType } from '@/server/types';
import { resolveInfinitePagination } from '@/server/utils/resolveInfinitePagination';
import { resolveInfinitePaginationResponse } from '@/server/utils/resolveInfinitePaginationResponse';
// import { resolvePrismaBooleanArg } from '@/server/utils/resolvePrismaBooleanArg';
import { validateSchema } from '@/server/utils/validateSchema';
import { GameRound } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

class GameRoundController {
  async create(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: CreateGameRoundArgs = req.body;
    validateSchema<CreateGameRoundArgs>(createGameRoundArgsSchema, body);
    //const response: GameRound = await GameRoundService.create(body);
    const response = await prisma.gameRound.create({
      data: {
        gameId: body.gameId,
      },
    });
    if (!response) {
      throw new InternalServerErrorException(
        `GameRound, with name ${body.gameId}, could not be created`,
      );
    }

    res.status(HttpResponseCodesEnum.CREATED).json(resolveInfinitePaginationResponse(response));
  }

  async deleteById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: GameRound = await GameRoundService.deleteById(Number(query.id!));

    if (!response) {
      throw new NotFoundException(`GameRound, with id ${query.id}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: GameRound | null = await GameRoundService.getById(Number(query.id!));

    if (!response) {
      throw new NotFoundException(`GameRound, with id ${query.id!}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getMany(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: GetManyGameRoundArgs = req.query;
    validateSchema<GetManyGameRoundArgs>(getManyGameRoundArgsSchema, query);
    const pagination: InfinitePaginationType = resolveInfinitePagination(req.query);
    const response: GameRound[] = await GameRoundService.bulkSearch({ ...query }, pagination);
    res
      .status(HttpResponseCodesEnum.OK)
      .json(resolveInfinitePaginationResponse(response, pagination));
  }

  async updateGameRound(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: UpdateGameRoundArgs = req.body;
    validateSchema<UpdateGameRoundArgs>(updateGameRoundArgsSchema, body);
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);
    const response: GameRound = await GameRoundService.updateGameRound(Number(query.id!), body);
    res.status(HttpResponseCodesEnum.OK).json(response);
  }
}

export default new GameRoundController();
