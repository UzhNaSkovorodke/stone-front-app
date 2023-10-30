import { ECmsStoneEndpoints, cmsRequest } from "../pageDataApi";
import { IOfficeResponse } from "./office.interface";

export const getOffice = (data: {
  projectUuid?: string | null;
  filter?: any;
  queryParams?: any;
}): Promise<IOfficeResponse> => {
  return cmsRequest.get<IOfficeResponse>({
    pageSlug: ECmsStoneEndpoints.OFFICE,
    filter: data.filter,
    queryParams: data.queryParams,
  });
};
