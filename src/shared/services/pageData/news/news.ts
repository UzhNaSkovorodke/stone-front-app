import { ECmsStoneEndpoints, cmsRequest } from 'shared/api/pageDataApi'
import { INewsResponse } from './news.interface'

export const getNews = (): Promise<INewsResponse> => {
  return cmsRequest.get<INewsResponse>({
    pageSlug: ECmsStoneEndpoints.NEWS,
    queryParams: 'populate=deep&sort=date:DESC',
  })
}
