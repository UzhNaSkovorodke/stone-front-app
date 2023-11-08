import { useQuery } from '@tanstack/react-query'
import { QUERYKEYS } from '../constants/queryKeys'
import { getPost } from '../services/posts'

interface UsePostParams {
  postId: string
  staleTime?: number
  refetchOnWindowFocus?: boolean
  enabled?: boolean
}

export const usePost = ({
  postId,
  staleTime = Infinity,
  refetchOnWindowFocus = false,
  enabled = true,
}: UsePostParams) => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERYKEYS.post, postId],
    queryFn: () => getPost(postId),
    staleTime,
    refetchOnWindowFocus,
    enabled,
  })

  return {
    post: data?.data[0],
    ...rest,
  }
}
