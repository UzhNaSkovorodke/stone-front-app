import { ECmsStoneEndpoints, cmsRequest } from "../pageDataApi";
import { IMainPageResponse } from "./main.interface";

export const getMain = (): Promise<IMainPageResponse> => {
  return cmsRequest.get<IMainPageResponse>({
    pageSlug: ECmsStoneEndpoints.MAIN,
    queryParams: "populate=deep,4",
  });
};
