import { ECmsStoneEndpoints, IRequestParams, cmsRequest } from "../pageDataApi";
import { IProjectsResponse } from "./projects.interface";

export const getProjects = (
  queryParams?: string
): Promise<IProjectsResponse> => {
  //TODO: PAATA поправить после релиза
  const params: IRequestParams = {
    pageSlug: ECmsStoneEndpoints.PROJECTS,
    queryParams: queryParams ? queryParams : "populate=deep",
    filter: null,
  };
  return cmsRequest.get<IProjectsResponse>(params);
};
