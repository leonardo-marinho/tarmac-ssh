import { InternalServerErrorException } from './InternalServerError.exception';

export class NotTreatedException extends InternalServerErrorException {
  constructor(message: string) {
    super(message);
  }
}
