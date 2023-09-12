import { AnyObject, ObjectSchema, ValidationError } from 'yup';
import { ValidationException } from '../exceptions/Validation.exception';

export const validateSchema = <TDto>(
  schema: ObjectSchema<AnyObject>,
  data: TDto,
) => {
  try {
    schema.validateSync(data, { abortEarly: false });
  } catch (error) {
    throw new ValidationException((error as ValidationError).errors.join(', '));
  }
};
