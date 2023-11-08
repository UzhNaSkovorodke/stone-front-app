import { useInfiniteQuery } from '@tanstack/react-query'
import { QUERYKEYS } from '../constants/queryKeys'
import { getLots } from '../services/lots'

interface useInfiniteLotsParams {
  staleTime?: number
  refetchOnWindowFocus?: boolean
  enabled?: boolean
}

export const useInfiniteLots = (
  queryString = '',
  { staleTime = Infinity, refetchOnWindowFocus = true, enabled = true }: useInfiniteLotsParams = {}
) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: [QUERYKEYS.infiniteLots, queryString],
    queryFn: ({ pageParam = 1 }) => getLots(`${queryString}&page=${pageParam}`),
    getNextPageParam: (lastPage) => lastPage.meta.currentPage + 1,
    staleTime,
    refetchOnWindowFocus,
    enabled,
  })

  return {
    pages: data?.pages || [],
    ...rest,
  }
}
