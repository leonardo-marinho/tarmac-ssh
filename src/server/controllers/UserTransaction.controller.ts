import prisma from '@/lib/database/client';
import { CreateUserDTO } from '@/lib/models/dto/CreateUser.dto';
import { GetManyUserDTO } from '@/lib/models/dto/GetManyUser.dto';
import { HashDTO } from '@/lib/models/dto/Hash.dto';
import { IdDTO } from '@/lib/models/dto/Id.dto';
import { getManyUserTransactionDtoSchema } from '@/lib/validations/GetManyUserTransactionDto.schema';
import { hashDtoSchema } from '@/lib/validations/HashDto.schema';
import { idDtoSchema } from '@/lib/validations/IdDto.schema';
import { resolveBulkArgs } from '@/server/utils/resolveBulkArgs';
import { resolvePrismaPaginationArgs } from '@/server/utils/resolvePrismaPaginationArgs';
import { Prisma, UserTransaction } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { HttpResponseCodesEnum } from '../enums';
import { InternalServerErrorException } from '../exceptions/InternalServerError.exception';
import { NotFoundException } from '../exceptions/NotFound.exception';
import { InfinitePaginationType } from '../types';
import { resolveInfinitePagination } from '../utils/resolveInfinitePagination';
import { resolveInfinitePaginationResponse } from '../utils/resolveInfinitePaginationResponse';
import { validateSchema } from '../utils/validateSchema';
import { CreateUserTransactionDTO } from '@/lib/models/dto/CreateUserTransaction.dto';
import { createUserTransactionDtoSchema } from '@/lib/validations/CreateUserTransactionDto.schema';
import { GetManyUserTransactionDTO } from '@/lib/models/dto/GetManyUserTransaction.dto';

class UserTransactionController {
  async create(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: CreateUserTransactionDTO = req.body;
    validateSchema<CreateUserTransactionDTO>(createUserTransactionDtoSchema, body);

    const response = await prisma.userTransaction.create({
      data: {
        contractHash: body.contractHash,
        amount: body.amount,
        userId: body.userId,
      },
    });

    if (!response) {
      throw new InternalServerErrorException('UserTransaction could not be created');
    }

    res.status(HttpResponseCodesEnum.CREATED).json(resolveInfinitePaginationResponse(response));
  }

  async deleteById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdDTO = req.query;
    validateSchema<IdDTO>(idDtoSchema, query);

    const response: null | UserTransaction = await prisma.userTransaction.delete({
      where: {
        id: Number(query.id),
      },
    });

    if (!response) {
      throw new NotFoundException(`User Transaction, with id ${query.id}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getByHash(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: HashDTO = req.query;
    validateSchema<HashDTO>(hashDtoSchema, query);

    const response: null | UserTransaction = await prisma.userTransaction.findUnique({
      where: {
        contractHash: query.hash,
      },
    });

    if (!response) {
      throw new NotFoundException(`User, with hash ${query.hash}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdDTO = req.query;
    validateSchema<IdDTO>(idDtoSchema, query);

    const response: null | UserTransaction = await prisma.userTransaction.findUnique({
      where: {
        id: Number(query.id),
      },
    });

    if (!response) {
      throw new NotFoundException(`User Transaction, with id ${query.id}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(resolveInfinitePaginationResponse(response));
  }

  async getMany(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: GetManyUserTransactionDTO = req.query as unknown as GetManyUserTransactionDTO;
    const pagination: InfinitePaginationType = resolveInfinitePagination(req.query);
    validateSchema<GetManyUserTransactionDTO>(getManyUserTransactionDtoSchema, query);

    const response = await prisma.userTransaction.findMany({
      where: resolveBulkArgs<Prisma.UserTransactionWhereInput>([
        {
          key: 'id',
          value: query?.ids,
        },
        {
          key: 'amount',
          value: query?.amount,
        },
        {
          key: 'contractHash',
          value: query?.contractHashes,
        },
        {
          key: 'userId',
          value: query?.userId,
        },
      ]),
      ...resolvePrismaPaginationArgs(pagination),
    });

    res
      .status(HttpResponseCodesEnum.OK)
      .json(resolveInfinitePaginationResponse(response, pagination));
  }

  async getTotalAmountByUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const allTransactions = await prisma.userTransaction.findMany({
        select: {
          userId: true,
          amount: true,
        },
      });

      const totalAmounts = allTransactions.reduce((acc, transaction) => {
        if (!acc[transaction.userId]) {
          acc[transaction.userId] = 0;
        }
        acc[transaction.userId] += transaction.amount;
        return acc;
      }, {});

      res.status(HttpResponseCodesEnum.OK).json(totalAmounts);
    } catch (error) {
      console.error('Error while calculating the total amount per user', error);
      throw new InternalServerErrorException('Failed to calculate the total amount per user');
    }
  }

  async getTotalAmountBySingleUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const userId = Number(req.query.userId); // Make sure to validate this properly

      const allTransactions = await prisma.userTransaction.findMany({
        where: {
          userId: userId,
        },
        select: {
          amount: true,
        },
      });

      const totalAmount = allTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

      res.status(HttpResponseCodesEnum.OK).json({ userId, totalAmount });
    } catch (error) {
      console.error('Error calculating the total amount for the user', error);
      throw new InternalServerErrorException('Failed to calculate the total amount for the user');
    }
  }
}

export default new UserTransactionController();
