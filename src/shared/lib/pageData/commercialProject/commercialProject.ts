import { ECmsStoneEndpoints, cmsRequest } from "../pageDataApi";
import { ICommercialProjectFilterResponse } from "./commercialProject.interface";

//TODO PAATA переписать для отображения иконок https://cms.stonehedgecompany.com/api/commercial-project-pages?populate[BlockInvestment][populate][forInvestment][populate][col][populate][col][populate][img]=url&filters[slug]=towers
export const getCommercialProject = (
  projectUuid?: string | null,
  filter?: any,
  queryParams?: any
): Promise<ICommercialProjectFilterResponse> => {
  return cmsRequest.get<ICommercialProjectFilterResponse>({
    pageSlug: ECmsStoneEndpoints.COMMERCIAL_PROJECT,
    filter: filter,
    queryParams: queryParams,
  });
};
export const getCommercialProjects = (
  projectUuid?: string | null,
  filter?: any,
  queryParams?: any
): Promise<ICommercialProjectFilterResponse> => {
  return cmsRequest.get<ICommercialProjectFilterResponse>({
    pageSlug: ECmsStoneEndpoints.COMMERCIAL_PROJECT,
    filter: filter,
    queryParams: queryParams,
  });
};
// 'populate[project][populate][metro]=station&populate[project][populate][pstatus]=title&populate[project][populate][features]=title&populate[project][populate][extraImg]=url'
