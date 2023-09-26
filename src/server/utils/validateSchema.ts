import { ValidationException } from '@/server/exceptions/Validation.exception';
import { AnyObject, ObjectSchema, ValidationError } from 'yup';

export const validateSchema = <TDto>(schema: ObjectSchema<AnyObject>, data: TDto) => {
  try {
    schema.validateSync(data, { abortEarly: false });
  } catch (error) {
    throw new ValidationException((error as ValidationError).errors.join(', '));
  }
};
