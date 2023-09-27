import { object, string } from 'yup';

import { CreateUserTransactionArgsDto } from '../models/dto/CreateUserTransactionArgs.dto';

export const createUserTransactionArgsSchema = object<CreateUserTransactionArgsDto>({
  amount: string().required(),
  hash: string().required(),
  userId: string().required(),
});
