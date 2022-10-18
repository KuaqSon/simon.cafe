import { useInfiniteQuery } from '@tanstack/react-query';
import { ICafe } from 'src/interfaces/cafe';
import { IPaginatorRequest, IPaginatorResponse } from 'src/interfaces/common';
import { getListCafesApi } from 'src/utils/api';

export function useQueryCafes(params: IPaginatorRequest) {
  const query = useInfiniteQuery(['cafes', params], ({ pageParam = params }) => getListCafesApi(pageParam), {
    refetchOnWindowFocus: false,
  });

  const currentParams: IPaginatorRequest =
    (query?.data?.pageParams[(query?.data?.pageParams?.length || 1) - 1] as IPaginatorRequest) || params;

  const lastResult = query?.data?.pages[(query?.data?.pages?.length || 1) - 1];

  return { ...query, currentParams, lastResult, hasNextPage: (lastResult?.data?.items?.length || 0) >= params.limit };
}
