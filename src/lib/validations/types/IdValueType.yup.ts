import { string } from 'yup';

export const yupIdValueType = string().test(
  'is-id-value',
  'The value must be a single number',
  (value) => {
    if (!value) return false;
    return !isNaN(Number(value.trim())); // Verifique se o valor é um número válido
  },
);
