import { ECmsStoneEndpoints, cmsRequest } from "../pageDataApi";
import { IPurchaseTermsResponse } from "./purchaseTerms.interface";

export const getPurchaseTerms = (data: {
  projectUuid?: string | null;
  filter?: any;
  queryParams?: any;
}): Promise<IPurchaseTermsResponse> => {
  return cmsRequest.get<IPurchaseTermsResponse>({
    pageSlug: ECmsStoneEndpoints.PURCHASE_TERMS,
    filter: data.filter,
    queryParams: data.queryParams,
  });
};
