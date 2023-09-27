import prisma from '@/lib/database/client';
import { CreateUserTransactionArgsDto } from '@/lib/models/dto/CreateUserTransactionArgs.dto';
import { HashArgs } from '@/lib/models/dto/HashArgs.dto';
import { IdArgs } from '@/lib/models/dto/IdArgs.dto';
import { createUserTransactionArgsSchema } from '@/lib/validations/CreateUserTransactionArgs.schema';
import { hashArgsSchema } from '@/lib/validations/HashArgs.schema';
import { idArgsSchema } from '@/lib/validations/IdArgs.schema';
import { UserTransaction } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { HttpResponseCodesEnum } from '../enums';
import { InternalServerErrorException } from '../exceptions/InternalServerError.exception';
import { NotFoundException } from '../exceptions/NotFound.exception';
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
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);

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
    const query: HashArgs = req.query;
    validateSchema<HashArgs>(hashArgsSchema, query);

    const response: null | UserTransaction = await prisma.userTransaction.findFirst({
      where: {
        hash: query.hash,
      },
    });

    if (!response) {
      throw new NotFoundException(`User, with hash ${query.hash}, not found`);
    }

    res.status(HttpResponseCodesEnum.OK).json(response);
  }

  async getById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const query: IdArgs = req.query;
    validateSchema<IdArgs>(idArgsSchema, query);

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

  async getTopUserByAmount(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const allTransactions = await prisma.userTransaction.findMany({
        select: {
          amount: true,
          userId: true,
        },
      });

      const totalAmounts: Record<number, number> = allTransactions.reduce(
        (acc: Record<number, number>, transaction) => {
          if (!acc[transaction.userId]) {
            acc[transaction.userId] = 0;
          }
          acc[transaction.userId] += transaction.amount;
          return acc;
        },
        {},
      );

      // Find the user with the maximum total transaction amount
      const topUserId = Object.keys(totalAmounts).reduce((acc, userId) => {
        return totalAmounts[Number(userId) as number] > totalAmounts[Number(acc) as number]
          ? userId
          : acc;
      });

      res
        .status(HttpResponseCodesEnum.OK)
        .json({ totalAmount: totalAmounts[Number(topUserId) as number], userId: topUserId });
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
      const totalAmounts = allTransactions.reduce((acc: Record<number, number>, transaction) => {
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
