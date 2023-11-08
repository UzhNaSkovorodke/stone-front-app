import { useQuery } from '@tanstack/react-query'
import { QUERYKEYS } from '../constants/queryKeys'
import { getProjects } from '../services/projects'

interface useProjectsParams {
  staleTime?: number
  refetchOnWindowFocus?: boolean
  enabled?: boolean
}

export const useProjects = ({
  staleTime = Infinity,
  refetchOnWindowFocus = false,
  enabled = true,
}: useProjectsParams = {}) => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERYKEYS.projects],
    queryFn: () => getProjects(),
    staleTime,
    refetchOnWindowFocus,
    enabled,
  })

  return {
    projects: data?.data || [],
    ...rest,
  }
}
