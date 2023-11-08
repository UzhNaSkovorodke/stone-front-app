import { ECmsStoneEndpoints, cmsRequest } from 'shared/api/pageDataApi'
import { ICommonResponse } from './common.interface'

export const getCommon = (): Promise<ICommonResponse> => {
  return cmsRequest.get<ICommonResponse>({
    pageSlug: ECmsStoneEndpoints.COMMON,
    queryParams: 'populate=deep',
  })
}
