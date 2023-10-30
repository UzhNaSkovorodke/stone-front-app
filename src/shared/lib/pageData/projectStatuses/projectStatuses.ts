import { ECmsStoneEndpoints, cmsRequest } from "../pageDataApi";
import { IDefaultPStatuses } from "../default/default.interface";

export const getProjectStatuses = (): Promise<IDefaultPStatuses> => {
  return cmsRequest.get<IDefaultPStatuses>({
    pageSlug: ECmsStoneEndpoints.PROJECT_STATUSES,
    queryParams: "populate=deep",
  });
};
