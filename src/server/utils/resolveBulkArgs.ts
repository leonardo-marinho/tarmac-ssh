import { KeyValuePair } from '@/server/types';

export const resolveBulkArgs = <TWhere>(
  args: KeyValuePair<keyof TWhere, string | undefined>[],
  andArgs: Partial<TWhere> = {},
): { OR: TWhere[] } | Partial<TWhere> => {
  const resolvedArgs = args
    .filter((arg) => arg.value !== undefined)
    .filter((arg) => arg.value!.trim() !== '')
    .map(({ key, value }) => value!.split(',').map((value) => ({ key, value: value.trim() })))
    .flat()
    .map(({ key, value }) => ({
      [key]: Number.isNaN(Number(value)) ? value : Number(value),
      ...andArgs,
    })) as TWhere[];

  return resolvedArgs.length > 0 ? { OR: resolvedArgs } : { ...andArgs };
};
