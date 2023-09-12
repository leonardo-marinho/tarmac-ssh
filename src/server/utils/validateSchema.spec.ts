import { createUserDtoSchema } from '@/lib/validations/CreateUserDto.schema';
import { idDtoSchema } from '@/lib/validations/IdDto.schema';

import { ValidationException } from '../exceptions/Validation.exception';
import { validateSchema } from './validateSchema';

describe('validationSchema', () => {
  it('should throw an error if the schema is invalid', () => {
    expect(() => validateSchema(createUserDtoSchema, { id: true })).toThrowError(
      ValidationException,
    );
  });

  it('should not throw an error if the schema is valid', () => {
    expect(() => validateSchema(idDtoSchema, { id: 1 })).not.toThrowError(ValidationException);
  });
});
