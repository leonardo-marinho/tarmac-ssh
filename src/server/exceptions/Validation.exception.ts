import { HttpResponseCodesEnum } from '../enums';
import { ApiException } from './Api';

export class ValidationException extends ApiException {
  constructor(message: string) {
    super(HttpResponseCodesEnum.BAD_REQUEST, message);
  }
}
