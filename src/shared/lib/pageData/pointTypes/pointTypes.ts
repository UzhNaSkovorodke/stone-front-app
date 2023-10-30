import { ECmsStoneEndpoints, cmsRequest } from "../pageDataApi";
import { IPointTypesResponse } from "./pointTypes.interface";

export const getPointTypes = (): Promise<IPointTypesResponse> => {
  return cmsRequest.get<IPointTypesResponse>({
    pageSlug: ECmsStoneEndpoints.POINT_TYPES,
    queryParams: "populate=deep",
  });
};