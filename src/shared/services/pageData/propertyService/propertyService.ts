import { ECmsStoneEndpoints, cmsRequest } from 'shared/api/pageDataApi'
import { IPropertyServiceResponse } from './propertyService.interface'

export const getPropertyService = (): Promise<IPropertyServiceResponse> => {
  return cmsRequest.get<IPropertyServiceResponse>({
    pageSlug: ECmsStoneEndpoints.PROPERTY_SERVICE,
    queryParams: 'populate=deep',
  })
}
