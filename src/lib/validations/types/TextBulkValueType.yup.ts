import { string } from 'yup';

export const yupTextBulkValueType = string().test(
  'is-text-bulk-value',
  'The value must be a comma separated list of values',
  () => true,
);
