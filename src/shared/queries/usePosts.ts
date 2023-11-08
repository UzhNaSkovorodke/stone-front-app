import { useInfiniteQuery } from '@tanstack/react-query'
import { QUERYKEYS } from '../constants/queryKeys'
import { PostsResponse, getPosts } from '../services/posts'

interface UsePostsParams {
  selectedCategories?: CategoryFilterItem[]
  staleTime?: number
  refetchOnWindowFocus?: boolean
  enabled?: boolean
}

export interface CategoryFilterItem {
  value: number
  label: string
  slug: string
}

const PER_PAGE = 6

export const usePosts = ({
  selectedCategories = [],
  staleTime = Infinity,
  refetchOnWindowFocus = false,
  enabled = true,
}: UsePostsParams = {}) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: [QUERYKEYS.posts],
    queryFn: ({ pageParam = 0 }) =>
      getPosts({
        start: pageParam,
        limit: PER_PAGE,
        categories: selectedCategories,
      }),
    getNextPageParam,
    staleTime,
    refetchOnWindowFocus,
    enabled,
  })

  return {
    pages: data?.pages || [],
    ...rest,
  }
}

const getNextPageParam = (lastPage: PostsResponse) => {
  const {
    meta: {
      pagination: { start, total, limit },
    },
  } = lastPage

  // No next page
  if (total <= (start + 1) * limit) return undefined

  return start + PER_PAGE
}
