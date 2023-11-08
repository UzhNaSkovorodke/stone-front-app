import { useQuery } from '@tanstack/react-query'
import { QUERYKEYS } from '../constants/queryKeys'
import { getPostCategories } from '../services/posts'

interface UsePostsParams {
  staleTime?: number
  refetchOnWindowFocus?: boolean
  enabled?: boolean
}

export const usePostCategories = ({
  staleTime = Infinity,
  refetchOnWindowFocus = false,
  enabled = true,
}: UsePostsParams = {}) => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERYKEYS.postCategories],
    queryFn: () => getPostCategories(),
    staleTime,
    refetchOnWindowFocus,
    enabled,
  })

  return {
    postCategories:
      data?.data.map((pc) => ({
        value: pc.id,
        label: pc.attributes.title,
        slug: pc.attributes.slug,
      })) || [],
    ...rest,
  }
}
