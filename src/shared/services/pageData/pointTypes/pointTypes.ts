import { ECmsStoneEndpoints, cmsRequest } from 'shared/api/pageDataApi'
import { IPointTypesResponse } from './pointTypes.interface'

export const getPointTypes = (): Promise<IPointTypesResponse> => {
  return cmsRequest.get<IPointTypesResponse>({
    pageSlug: ECmsStoneEndpoints.POINT_TYPES,
    queryParams: 'populate=deep',
  })
}
