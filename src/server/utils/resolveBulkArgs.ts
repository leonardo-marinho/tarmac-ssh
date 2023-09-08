import { isString } from 'lodash';

export const resolveBulkArgs = <TWhere>(
  args: [string[], string][],
  and: Partial<TWhere> = {},
): TWhere[] => {
  args = args.map(([arr, key]) =>
    isString(arr) ? [arr.replace(', ', ',').split(','), key] : [[], key],
  );
  return args
    .map(([arr, key]) =>
      (arr || []).map((arg) => ({
        [key]: Number.isNaN(Number(arg)) ? arg : Number(arg),
        ...and,
      })),
    )
    .flat() as TWhere[];
};
