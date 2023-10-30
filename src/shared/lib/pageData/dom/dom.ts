import { ECmsStoneEndpoints, cmsRequest } from "../pageDataApi";
import { IResidentialPageResponse } from "./dom.interface";

export const getDom = (data: {
  projectUuid?: string | null;
  filter?: any;
  queryParams?: any;
}): Promise<IResidentialPageResponse> => {
  return cmsRequest.get<IResidentialPageResponse>({
    pageSlug: ECmsStoneEndpoints.DOM,
    filter: data.filter,
    queryParams: data.queryParams,
  });
};
