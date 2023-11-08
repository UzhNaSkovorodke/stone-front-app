import matchMedia from 'matchmediaquery'
import { useCallback, useState, useEffect } from 'react'

const useMatchMedia = (query: string) => {
  const [match, setMatch] = useState(false)

  const canMatch = typeof window === 'object'

  const queryMedia = useCallback(() => {
    const queryList = matchMedia(query)
    setMatch(queryList?.matches || false)
    return queryList
  }, [query])

  useEffect(() => {
    if (!canMatch) return
    const queryList = queryMedia()
    // @ts-ignore
    queryList?.addListener(queryMedia)
    // @ts-ignore
    return () => queryList?.removeListener(queryMedia)
  }, [queryMedia, canMatch])

  return match
}

export default useMatchMedia
