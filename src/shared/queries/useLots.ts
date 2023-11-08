import { useQuery } from '@tanstack/react-query'
import { QUERYKEYS } from '../constants/queryKeys'
import { getLots } from '../services/lots'

interface useLotsParams {
  staleTime?: number
  refetchOnWindowFocus?: boolean
  enabled?: boolean
}

export const useLots = (
  queryString = '',
  { staleTime = Infinity, refetchOnWindowFocus = true, enabled = true }: useLotsParams = {}
) => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERYKEYS.lots],
    queryFn: () => getLots(queryString),
    staleTime,
    refetchOnWindowFocus,
    enabled,
  })

  return {
    lots: data?.data || [],
    lotProjects: data?.filter.allProjects || [],
    filter: data?.filter.pageData,
    types: data?.filter.type,
    businessTypes: data?.filter.businessTypes || {},
    total: data?.meta.total,
    ...rest,
  }
}
