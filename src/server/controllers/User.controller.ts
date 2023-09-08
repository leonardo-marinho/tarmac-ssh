import { Prisma, User } from '@prisma/client';
import { InfinitePaginationResponseType } from '../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { CreateUserDTO } from '@/lib/models/dto/CreateUser.dto';
import prisma from '@/lib/prisma';
import { HttpResponseCodesEnum } from '../enum';
import { resolveInfinitePaginationResponse } from '../utils/resolvePaginatedResponse';
import { handleNotFoundResponse } from '../utils/handleNotFoundReponse';
import { createUserDtoSchema } from '@/lib/validations/CreateUserDto.schema';
import { handleValidationErrorResponse } from '../utils/handleValidationErrorResponse';
import { handlePrismaErrorResponse } from '../utils/handlePrismaErrorResponse';
import { FindManyUserDTO } from '@/lib/models/dto/FindManyUser.dto';
import { FindManyUserDtoSchema } from '@/lib/validations/FindManyUserDto.schema';
import { resolveBulkArgs } from '@/server/utils/resolveBulkArgs';
import { DEFAULT_ITEMS_PER_PAGE } from '../constants';

class UserController {
  async create(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: CreateUserDTO = req.body;

    try {
      createUserDtoSchema.validateSync(body);
    } catch (error) {
      handleValidationErrorResponse(req, res, error as Error);
      return;
    }

    try {
      const response = await prisma.user.create({
        data: {
          username: body.username,
          accountHash: body.accountHash,
        },
      });
      res
        .status(HttpResponseCodesEnum.CREATED)
        .json(resolveInfinitePaginationResponse(response));
    } catch (error) {
      handlePrismaErrorResponse(
        req,
        res,
        error as Prisma.PrismaClientKnownRequestError,
      );
    }
  }

  async findMany(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: FindManyUserDTO = req.query as unknown as FindManyUserDTO;

    try {
      FindManyUserDtoSchema.validateSync(query);
    } catch (error) {
      handleValidationErrorResponse(req, res, error as Error);
      return;
    }

    const whereArgs = resolveBulkArgs<Prisma.UserWhereInput>([
      [query?.ids || [], 'id'],
      [query?.usernames || [], 'username'],
      [query?.accountHashes || [], 'accountHash'],
    ]);
    console.log(whereArgs);
    const itemsPerPage = query.itemsPerPage || DEFAULT_ITEMS_PER_PAGE;

    try {
      const response = await prisma.user.findMany({
        where: {
          // ...(whereArgs.length > 0 ? { OR: whereArgs } : {}),
          OR: [{ id: 6 }],
        },
        take: itemsPerPage + 1,
      });

      const hasMore = response.length > itemsPerPage;

      res
        .status(HttpResponseCodesEnum.CREATED)
        .json(resolveInfinitePaginationResponse(response, query.page, hasMore));
    } catch (error) {
      handlePrismaErrorResponse(
        req,
        res,
        error as Prisma.PrismaClientKnownRequestError,
      );
    }
  }

  async getById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const id = Number(req.query.id);

    const response: User | null = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!response) {
      handleNotFoundResponse(req, res);
    } else {
      res
        .status(HttpResponseCodesEnum.OK)
        .json(resolveInfinitePaginationResponse(response));
    }
  }
}

const instance = new UserController();

export default instance;
