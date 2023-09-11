export const resolveBulkArgs = <TWhere>(
  args: { value: string | undefined; key: keyof TWhere }[],
  and: Partial<TWhere> = {},
): { OR: TWhere[] } | undefined => {
  const resolvedArgs = args
    .filter((arg) => arg.value !== undefined)
    .filter((arg) => arg.value!.trim() !== '')
    .map(({ key, value }) =>
      value!.split(',').map((value) => ({ key, value: value.trim() })),
    )
    .flat()
    .map(({ key, value }) => ({
      [key]: value,
      ...and,
    })) as TWhere[];

  return resolvedArgs.length > 0 ? { OR: resolvedArgs } : undefined;
};
