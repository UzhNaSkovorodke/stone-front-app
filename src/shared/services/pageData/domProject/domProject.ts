import { ECmsStoneEndpoints, cmsRequest } from 'shared/api/pageDataApi'
import { IDomProjectFilterResponse } from './domProject.interface'

export const getDomProject = (
  projectUuid?: string | null,
  filter?: any
): Promise<IDomProjectFilterResponse> => {
  return cmsRequest.get<IDomProjectFilterResponse>({
    pageSlug: ECmsStoneEndpoints.DOM_PROJECT,
    filter: filter,
    queryParams: 'populate=deep',
  })
}

export const getDomProjects = (
  projectUuid?: string | null,
  filter?: any,
  queryParams?: any
): Promise<IDomProjectFilterResponse> => {
  return cmsRequest.get<IDomProjectFilterResponse>({
    pageSlug: ECmsStoneEndpoints.DOM_PROJECT,
    filter: filter,
    queryParams: queryParams,
  })
}
