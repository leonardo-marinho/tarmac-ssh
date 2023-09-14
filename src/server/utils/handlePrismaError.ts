import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaErrorsEnum } from '../enums';
import { NotFoundException } from '../exceptions/NotFound.exception';
import { NotTreatedException } from '../exceptions/NotTreated.exception';

const formatPrismaErrorMessage = (message: string): string => {
  return message.replaceAll('\n', '');
};

export const handlePrismaError = (error: PrismaClientKnownRequestError): never => {
  const formattedMessage = formatPrismaErrorMessage(error.message);

  if (error.code === PrismaErrorsEnum.RECORD_NOT_FOUND) {
    throw new NotFoundException(formattedMessage);
  }

  throw new NotTreatedException(formattedMessage);
};
