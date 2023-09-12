import { keys } from 'lodash';

export const resolveBulkArgs = <TWhere>(
  args: { key: keyof TWhere; value: string | undefined }[],
  and: { [key: string]: string } = {},
): { OR: TWhere[] } | undefined => {
  const resolvedANDArgs: { [key: string]: string } = {};
  keys(and).map((key) => ({ [key]: Number.isNaN(Number(and[key])) ? and[key] : Number(and[key]) }));

  const resolvedArgs = args
    .filter((arg) => arg.value !== undefined)
    .filter((arg) => arg.value!.trim() !== '')
    .map(({ key, value }) => value!.split(',').map((value) => ({ key, value: value.trim() })))
    .flat()
    .map(({ key, value }) => ({
      [key]: Number.isNaN(Number(value)) ? value : Number(value),
      ...resolvedANDArgs,
    })) as TWhere[];

  return resolvedArgs.length > 0 ? { OR: resolvedArgs } : undefined;
};
