import { DEFAULT_ITEMS_PER_PAGE } from '../constants';
import {
  InfinitePaginationResponseType,
  InfinitePaginationType,
} from '../types';

export const resolveInfinitePaginationResponse = <TResponseData>(
  data: TResponseData | TResponseData[],
  pagination?: InfinitePaginationType,
): InfinitePaginationResponseType<TResponseData> => {
  pagination = pagination || {
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  };
  let records = Array.isArray(data) ? data : [data];
  const hasMore = records.length > pagination.itemsPerPage;
  records = hasMore ? records.slice(0, records.length - 1) : records;

  return {
    page: pagination.page,
    hasMore,
    records,
  };
};
