import { HttpMethodsEnum, HttpResponseCodesEnum } from '../enums';
import { ApiException } from './Api';

export class UnsupportedMethodException extends ApiException {
  constructor(method: HttpMethodsEnum, endpoint?: string) {
    super(
      HttpResponseCodesEnum.METHOD_NOT_ALLOWED,
      `Method ${method} not allowed for ${endpoint || 'this'} endpoint`,
    );
  }
}
