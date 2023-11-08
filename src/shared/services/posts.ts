import { requestCms } from '../api/requestCms'
import { CategoryFilterItem } from '../queries/usePosts'
import { IDefaultButton } from '../services/pageData/default/default.interface'

export interface PostsResponse {
  data: Post[]
  meta: {
    pagination: {
      start: number
      limit: number
      total: number
    }
  }
}

export interface Post {
  id: number
  attributes: {
    title: string
    Button: IDefaultButton
    slug: string
    text: string
    type: string
    publishedAt: string
    createdAt: string
    updatedAt: string
    date: string
    img: {
      data: {
        attributes: {
          url: string
          width: number
          height: number
        }
      }
    }
    categories: {
      data: PostCategory[]
    }
    source: {
      data: {
        id: number
        attributes: {
          title: string
          link: string
          img: {
            data: {
              attributes: {
                url: string
              }
            }
          }
        }
      }
    }
  }
}

export interface PostCategory {
  id: number
  attributes: {
    title: string
    slug: string
  }
}

interface GetPostsParams {
  categories: CategoryFilterItem[]
  start?: number
  limit?: number
}

export const getPosts = ({ start = 0, limit = 6, categories }: GetPostsParams) => {
  const filters = getCategoryFilterQueryObject(categories)

  return requestCms.get<PostsResponse>('/stone-posts', {
    params: {
      populate: 'deep',
      'sort[publishedAt]': 'DESC',
      ...filters,
      'pagination[start]': start,
      'pagination[limit]': limit,
    },
  })
}

interface PostResponse {
  data: Array<Post>
  meta: unknown
}

export const getPost = (postId: string) =>
  requestCms.get<PostResponse>(`/stone-posts?filters[slug]=${postId}&populate=deep`)

interface PostCategoriesResponse {
  data: PostCategory[]
}

export const getPostCategories = () => requestCms.get<PostCategoriesResponse>('/p-categories')

const getCategoryFilterQueryObject = (
  categories: CategoryFilterItem[]
): { [key: string]: string } => {
  const filterTemplateString = 'filters[categories][slug][$in]'

  return categories.reduce(
    (res, category, index) => ({
      ...res,
      [`${filterTemplateString}[${index}]`]: category.slug,
    }),
    {}
  )
}
