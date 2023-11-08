import { ECmsStoneEndpoints, cmsRequest } from 'shared/api/pageDataApi'
import { ILoyaltyResponse } from './loyalty.interface'

export const getLoyalty = (data: {
  projectUuid?: string | null
  filter?: any
  queryParams?: any
}): Promise<ILoyaltyResponse> => {
  return cmsRequest.get<ILoyaltyResponse>({
    pageSlug: ECmsStoneEndpoints.LOYALTY,
    filter: data.filter,
    queryParams: data.queryParams,
  })
}
