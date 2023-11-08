import { ECmsStoneEndpoints, cmsRequest } from 'shared/api/pageDataApi'
import { IMainPageResponse } from './main.interface'

export const getMain = (): Promise<IMainPageResponse> => {
  return cmsRequest.get<IMainPageResponse>({
    pageSlug: ECmsStoneEndpoints.MAIN,
    queryParams: 'populate=deep,4',
  })
}
