import { ECmsStoneEndpoints, cmsRequest } from 'shared/api/pageDataApi'
import { IContactsPageResponse } from './contacts.interface'

export const getContacts = (): Promise<IContactsPageResponse> => {
  return cmsRequest.get<IContactsPageResponse>({
    pageSlug: ECmsStoneEndpoints.CONTACTS,
    queryParams: 'populate=deep',
  })
}
