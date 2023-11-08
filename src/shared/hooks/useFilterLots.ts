import { useQuery } from '@tanstack/react-query'
import { QUERYKEYS } from '../constants/queryKeys'
import { getLots } from '../services/lots'

export const useFilterLots = (query = '') => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERYKEYS.lots],
    queryFn: () => getLots(query),
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    enabled: true,
  })

  return {
    data: data,
    correspondingProjects: data?.filter.pageData.correspondingProjects,
    lots: data?.data || [],
    projects: data?.filter.pageData.projects || [],
    filter: data?.filter.pageData,
    allProjects: data?.filter.allProjects || [],
    allBusinessTypes: data?.filter.allBusinessTypes || [],
    total: data?.meta.total,
    ...rest,
  }
}
