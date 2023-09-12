import { idDtoSchema } from '@/lib/validations/IdDto.schema';
import { validateSchema } from './validateSchema';
import { ValidationException } from '../exceptions/Validation.exception';
import { createUserDtoSchema } from '@/lib/validations/CreateUserDto.schema';

describe('validationSchema', () => {
  it('should throw an error if the schema is invalid', () => {
    expect(() =>
      validateSchema(createUserDtoSchema, { id: true }),
    ).toThrowError(ValidationException);
  });

  it('should not throw an error if the schema is valid', () => {
    expect(() => validateSchema(idDtoSchema, { id: 1 })).not.toThrowError(
      ValidationException,
    );
  });
});
