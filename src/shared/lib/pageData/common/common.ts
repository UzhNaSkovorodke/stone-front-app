import { ECmsStoneEndpoints, cmsRequest } from "../pageDataApi";
import { ICommonResponse } from "./common.interface";

export const getCommon = (): Promise<ICommonResponse> => {
  return cmsRequest.get<ICommonResponse>({
    pageSlug: ECmsStoneEndpoints.COMMON,
    queryParams: "populate=deep",
  });
};
