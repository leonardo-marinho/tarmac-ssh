import { HttpResponseCodesEnum, HttpResponseCodesNamesEnum } from './enums';
import { ApiErrorNamesType, ControllerErrorResponseType } from './types';

export const ApiErrors: Record<ApiErrorNamesType, Omit<ControllerErrorResponseType, 'error'>> = {
  BAD_REQUEST: {
    code: HttpResponseCodesNamesEnum.BAD_REQUEST,
    httpResponseCode: HttpResponseCodesEnum.BAD_REQUEST,
    name: 'Bad request',
  },
  FORBIDDEN: {
    code: HttpResponseCodesNamesEnum.FORBIDDEN,
    httpResponseCode: HttpResponseCodesEnum.FORBIDDEN,
    name: 'Forbidden',
  },
  [HttpResponseCodesNamesEnum.METHOD_NOT_ALLOWED]: {
    code: HttpResponseCodesNamesEnum.METHOD_NOT_ALLOWED,
    httpResponseCode: HttpResponseCodesEnum.METHOD_NOT_ALLOWED,
    name: 'Method not allowed',
  },
  INTERNAL_SERVER_ERROR: {
    code: HttpResponseCodesNamesEnum.INTERNAL_SERVER_ERROR,
    httpResponseCode: HttpResponseCodesEnum.INTERNAL_SERVER_ERROR,
    name: 'Internal server error',
  },
  NOT_FOUND: {
    code: HttpResponseCodesNamesEnum.NOT_FOUND,
    httpResponseCode: HttpResponseCodesEnum.NOT_FOUND,
    name: 'Not found',
  },
  UNAUTHORIZED: {
    code: HttpResponseCodesNamesEnum.UNAUTHORIZED,
    httpResponseCode: HttpResponseCodesEnum.UNAUTHORIZED,
    name: 'Unauthorized',
  },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    httpResponseCode: HttpResponseCodesEnum.BAD_REQUEST,
    name: 'Validation error',
  },
};

export const DEFAULT_ITEMS_PER_PAGE = 20;
