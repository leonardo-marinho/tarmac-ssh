import { createUserArgsSchema } from '@/lib/validations/CreateUserArgs.schema';
import { idArgsSchema } from '@/lib/validations/IdArgs.schema';
import { ValidationException } from '@/server/exceptions/Validation.exception';

import { validateSchema } from './validateSchema';

describe('validationSchema', () => {
  it('should throw an error if the schema is invalid', () => {
    expect(() => validateSchema(createUserArgsSchema, { id: true })).toThrowError(
      ValidationException,
    );
  });

  it('should not throw an error if the schema is valid', () => {
    expect(() => validateSchema(idArgsSchema, { id: 1 })).not.toThrowError(ValidationException);
  });
});
