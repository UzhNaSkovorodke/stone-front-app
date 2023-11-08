import { ECmsStoneEndpoints, cmsRequest } from 'shared/api/pageDataApi'
import { IDocumentsResponse } from './documents.interface'

export const getDocuments = (): Promise<IDocumentsResponse> => {
  return cmsRequest.get<IDocumentsResponse>({
    pageSlug: ECmsStoneEndpoints.DOCUMENTS,
    queryParams: 'populate=deep',
  })
}
