import { ECmsStoneEndpoints, cmsRequest } from "../pageDataApi";
import { IContactsPageResponse } from "./contacts.interface";

export const getContacts = (): Promise<IContactsPageResponse> => {
  return cmsRequest.get<IContactsPageResponse>({
    pageSlug: ECmsStoneEndpoints.CONTACTS,
    queryParams: "populate=deep",
  });
};
