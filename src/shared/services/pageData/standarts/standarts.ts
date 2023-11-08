import { ECmsStoneEndpoints, cmsRequest } from 'shared/api/pageDataApi'
import { IStandartsResponse } from './standarts.interface'

export const getStandarts = (filter?: any): Promise<IStandartsResponse> => {
  return cmsRequest.get<IStandartsResponse>({
    pageSlug: ECmsStoneEndpoints.STANDARTS,
    filter: filter,
    queryParams: 'populate=deep',
  })
}
