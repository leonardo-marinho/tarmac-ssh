import { Prisma, User } from '@prisma/client';
import { InfinitePaginationType } from '../types';
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
import { resolveInfinitePagination } from '../utils/resolveInfinitePagination';
import { resolvePrismaPaginationArgs } from '@/server/utils/resolvePrismaPaginationArgs';
import { IdDTO } from '@/lib/models/dto/Id.dto';
import { IdDtoSchema } from '@/lib/validations/IdDto.schema';

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

  async deleteById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdDTO = req.query;

    try {
      IdDtoSchema.validateSync(query);
    } catch (error) {
      handleValidationErrorResponse(req, res, error as Error);
      return;
    }

    try {
      const response: User | null = await prisma.user.delete({
        where: {
          id: Number(query.id),
        },
      });

      if (!response) {
        handleNotFoundResponse(req, res);
      } else {
        res
          .status(HttpResponseCodesEnum.OK)
          .json(resolveInfinitePaginationResponse(response));
      }

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
    const pagination: InfinitePaginationType = resolveInfinitePagination(
      req.query,
    );

    try {
      FindManyUserDtoSchema.validateSync(query);
    } catch (error) {
      handleValidationErrorResponse(req, res, error as Error);
      return;
    }

    try {
      const response = await prisma.user.findMany({
        where: resolveBulkArgs<Prisma.UserWhereInput>([
          [query?.ids || [], 'id'],
          [query?.usernames || [], 'username'],
          [query?.accountHashes || [], 'accountHash'],
        ]),
        ...resolvePrismaPaginationArgs(pagination),
      });

      res
        .status(HttpResponseCodesEnum.CREATED)
        .json(resolveInfinitePaginationResponse(response, pagination));
    } catch (error) {
      handlePrismaErrorResponse(
        req,
        res,
        error as Prisma.PrismaClientKnownRequestError,
      );
    }
  }

  async getById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdDTO = req.query;

    try {
      IdDtoSchema.validateSync(query);
    } catch (error) {
      handleValidationErrorResponse(req, res, error as Error);
      return;
    }

    const response: User | null = await prisma.user.findUnique({
      where: {
        id: Number(query.id),
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

export default new UserController();