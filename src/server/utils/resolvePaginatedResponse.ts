import { InfinitePaginationResponseType } from '../types';

export const resolveInfinitePaginationResponse = <TResponseData>(
  data: TResponseData | TResponseData[],
  page = 1,
  hasMore = false,
): InfinitePaginationResponseType<TResponseData> => {
  const records = Array.isArray(data) ? data : [data];

  return {
    page,
    hasMore,
    records,
  };
};
