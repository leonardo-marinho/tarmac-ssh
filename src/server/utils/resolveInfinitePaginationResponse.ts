import { DEFAULT_ITEMS_PER_PAGE } from '@/server/constants';
import { InfinitePaginationResponseType, InfinitePaginationType } from '@/server/types';

export const resolveInfinitePaginationResponse = <TResponseData>(
  data: TResponseData | TResponseData[],
  pagination?: InfinitePaginationType,
): InfinitePaginationResponseType<TResponseData> => {
  pagination = pagination || {
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    page: 1,
  };
  let records = Array.isArray(data) ? data : [data];
  const hasMore = records.length > pagination.itemsPerPage;
  records = hasMore ? records.slice(0, records.length - 1) : records;

  return {
    hasMore,
    page: pagination.page,
    records,
  };
};
