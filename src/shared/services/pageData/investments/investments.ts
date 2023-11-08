import { ECmsStoneEndpoints, cmsRequest } from 'shared/api/pageDataApi'
import { IInvestmentsPageResponse } from './investments.interface'

export const getInvestments = (data: {
  projectUuid?: string | null
  filter?: any
  queryParams?: any
}): Promise<IInvestmentsPageResponse> => {
  return cmsRequest.get<IInvestmentsPageResponse>({
    pageSlug: ECmsStoneEndpoints.INVESTMENTS,
    filter: data.filter,
    queryParams: data.queryParams,
  })
}
