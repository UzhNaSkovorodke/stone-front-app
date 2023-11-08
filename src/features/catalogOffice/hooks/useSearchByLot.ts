import { useLot } from 'shared/queries/useLot'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export const useSearchByLot = () => {
  const [lotNumber, setLotNumber] = useState('')
  const router = useRouter()
  const { lot, refetch, isError, isFetching } = useLot({
    lotNumber,
    enabled: false,
    retry: false,
  })

  const handleSubmitSearch = useCallback((s: string) => {
    setLotNumber(s)
  }, [])

  useEffect(() => {
    if (!lotNumber) return
    refetch()
  }, [lotNumber, refetch])

  useEffect(() => {
    if (!lot) return
    router.push(`/catalog/commercial/${lot.number}`)
  }, [lot])

  return {
    isLoadingSearch: isFetching,
    handleSubmitSearch,
    isError,
  }
}
