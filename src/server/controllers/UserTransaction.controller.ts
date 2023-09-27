import prisma from '@/lib/database/client';
import { CreateUserTransactionArgsDto } from '@/lib/models/dto/CreateUserTransactionArgs.dto';
import { GetManyUserTransactionDTO } from '@/lib/models/dto/GetManyUserTransaction.dto';
import { HashDTO } from '@/lib/models/dto/Hash.dto';
import { IdDTO } from '@/lib/models/dto/Id.dto';
import { createUserTransactionArgsSchema } from '@/lib/validations/CreateUserTransactionArgs.schema';
import { getManyUserTransactionArgsSchema } from '@/lib/validations/GetManyUserTransactionArgs.schema';
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

class UserTransactionController {
  async create(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body: CreateUserTransactionArgsDto = req.body;
    validateSchema<CreateUserTransactionArgsDto>(createUserTransactionArgsSchema, body);

    const response = await prisma.userTransaction.create({
      data: {
        amount: body.amount,
        hash: body.hash,
        userId: body.userId,
      },
    });

    if (!response) {
      throw new InternalServerErrorException('UserTransaction could not be created');
    }

    res.status(HttpResponseCodesEnum.CREATED).json(response);
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

    res.status(HttpResponseCodesEnum.OK).json(response);
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

    res.status(HttpResponseCodesEnum.OK).json(response);
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

    res.status(HttpResponseCodesEnum.OK).json(response);
  }

  async getMany(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: GetManyUserTransactionDTO = req.query as unknown as GetManyUserTransactionDTO;
    const pagination: InfinitePaginationType = resolveInfinitePagination(req.query);
    validateSchema<GetManyUserTransactionDTO>(getManyUserTransactionArgsSchema, query);

    const response = await prisma.userTransaction.findMany({
      where: resolveBulkArgs<Prisma.UserTransactionWhereInput>([
        {
          key: 'id',
          value: query?.ids,
        },
        {
          key: 'amounts',
          value: query?.amount,
        },
        {
          key: 'hash',
          value: query?.hashes,
        },
        {
          key: 'userIds',
          value: query?.userId,
        },
      ]),
      ...resolvePrismaPaginationArgs(pagination),
    });

    res
      .status(HttpResponseCodesEnum.OK)
      .json(resolveInfinitePaginationResponse(response, pagination));
  }

  async getTopUserByAmount(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const allTransactions = await prisma.userTransaction.findMany({
        select: {
          amount: true,
          userId: true,
        },
      });

      const totalAmounts = allTransactions.reduce((acc, transaction) => {
        if (!acc[transaction.userId]) {
          acc[transaction.userId] = 0;
        }
        acc[transaction.userId] += transaction.amount;
        return acc;
      }, {});

      // Find the user with the maximum total transaction amount
      const topUserId = Object.keys(totalAmounts).reduce((acc, userId) => {
        return totalAmounts[userId] > totalAmounts[acc] ? userId : acc;
      });

      res
        .status(HttpResponseCodesEnum.OK)
        .json({ totalAmount: totalAmounts[topUserId], userId: topUserId });
    } catch (error) {
      console.error('Error while calculating the top user by amount', error);
      throw new InternalServerErrorException('Failed to calculate the top user by amount');
    }
  }

  async getTotalAmountBySingleUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (!req.query.userId) {
      res.status(HttpResponseCodesEnum.BAD_REQUEST).send('userId is required');
      return;
    }

    const userId = Number(req.query.userId);
    if (isNaN(userId)) {
      res.status(HttpResponseCodesEnum.BAD_REQUEST).send('userId needs to be a number');
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const allTransactions = await prisma.userTransaction.findMany({
      select: {
        amount: true,
      },
      where: {
        userId: userId,
      },
    });
    try {
      const totalAmount = allTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

      res.status(HttpResponseCodesEnum.OK).json({ totalAmount, userId });
    } catch (error) {
      console.error('Error calculating the total amount for the user', error);
      throw new InternalServerErrorException('Failed to calculate the total amount for the user');
    }
  }

  async getTotalAmountByUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const allTransactions = await prisma.userTransaction.findMany({
      select: {
        amount: true,
        userId: true,
      },
    });

    try {
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
}

export default new UserTransactionController();
