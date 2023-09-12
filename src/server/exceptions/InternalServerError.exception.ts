import { HttpResponseCodesEnum } from '../enums';
import { ApiException } from './Api';

export class InternalServerErrorException extends ApiException {
  constructor(message: string) {
    super(HttpResponseCodesEnum.INTERNAL_SERVER_ERROR, message);
  }
}
