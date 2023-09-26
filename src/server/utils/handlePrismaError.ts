import { PrismaErrorsEnum } from '@/server/enums';
import { NotFoundException } from '@/server/exceptions/NotFound.exception';
import { NotTreatedException } from '@/server/exceptions/NotTreated.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const formatPrismaErrorMessage = (message: string): string => {
  return message.replaceAll(/\n/g, '').replaceAll(/ +/g, ' ');
};

export const handlePrismaError = (error: PrismaClientKnownRequestError): never => {
  const formattedMessage = formatPrismaErrorMessage(error.message);

  if (error.code === PrismaErrorsEnum.RECORD_NOT_FOUND) {
    throw new NotFoundException(formattedMessage);
  }

  throw new NotTreatedException(formattedMessage);
};
