import { PrismaErrorsEnum } from '@/server/enums';
import { KnownErrorParams, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface PrismaClientKnownRequestErrorMockOptions {
  message: string;
  params: Partial<KnownErrorParams>;
}

export const mockPrismaClientKnownRequestError = (
  value?: PrismaClientKnownRequestError,
  options?: Partial<PrismaClientKnownRequestErrorMockOptions>,
): PrismaClientKnownRequestError => {
  const resolvedOptionsParams: KnownErrorParams = {
    ...options?.params,
    clientVersion: options?.params?.clientVersion || '5.2.0',
    code: options?.params?.code || PrismaErrorsEnum.UNIQUE_CONSTRAINT_VALIDATION,
  };
  return value || new PrismaClientKnownRequestError(options?.message || '', resolvedOptionsParams);
};
