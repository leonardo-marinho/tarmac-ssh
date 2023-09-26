import { HttpResponseCodesEnum } from '../enums';
import { ApiException } from './Api';

export class UnauthorizedException extends ApiException {
  constructor(message: string) {
    super(HttpResponseCodesEnum.UNAUTHORIZED, message);
  }
}
