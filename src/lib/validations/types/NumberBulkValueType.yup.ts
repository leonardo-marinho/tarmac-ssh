import { string } from 'yup';

export const yupNumberBulkValueType = string().test(
  'is-bulk-value',
  'The value must be a comma separated list of numbers',
  (value) => {
    if (!value) return true;
    const values = value.split(',').map(Number);
    return values.every((val) => !isNaN(val));
  },
);
