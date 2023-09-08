import { isString } from 'lodash';
import { AnyObject } from 'yup';

export const resolveBulkArgs = <TWhere>(
  args: [string[], string][],
  and: Partial<TWhere> = {},
): { OR: TWhere[] } | AnyObject => {
  args = args.map(([arr, key]) =>
    isString(arr) ? [arr.replaceAll(', ', ',').split(','), key] : [[], key],
  );

  const resolvedArgs = args
    .map(([arr, key]) =>
      (arr || []).map((arg) => ({
        [key]: Number.isNaN(Number(arg)) ? arg : Number(arg),
        ...and,
      })),
    )
    .flat() as TWhere[];

  return resolvedArgs.length > 0 ? { OR: resolvedArgs } : {};
};
