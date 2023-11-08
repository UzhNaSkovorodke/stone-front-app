import { useQuery } from '@tanstack/react-query'
import { QUERYKEYS } from '../constants/queryKeys'
import { getLot } from '../services/lots'

interface useLotsParams {
  lotNumber: string
  staleTime?: number
  refetchOnWindowFocus?: boolean
  enabled?: boolean
  retry?: boolean | number
}

export const useLot = (
  {
    lotNumber,
    staleTime = Infinity,
    refetchOnWindowFocus = true,
    enabled = true,
    retry,
  }: useLotsParams = { lotNumber: '' }
) => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERYKEYS.lot, lotNumber],
    queryFn: () => getLot(lotNumber),
    staleTime,
    refetchOnWindowFocus,
    enabled,
    retry,
  })

  return {
    lot: data?.data,
    ...rest,
  }
}
