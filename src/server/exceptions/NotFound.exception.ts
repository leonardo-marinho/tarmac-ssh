import { HttpResponseCodesEnum } from '../enums';
import { ApiException } from './Api';

export class NotFoundException extends ApiException {
  constructor(message: string) {
    super(HttpResponseCodesEnum.NOT_FOUND, message);
  }
}
