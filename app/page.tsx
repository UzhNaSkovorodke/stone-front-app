import styles from "./page.module.css";
import { cmsRequest, ECmsStoneEndpoints } from "@/app/lib/api/pageDataApi";
import { ICommonResponse } from "@/app/lib/services/pageData/common/common.interface";

export default async function Home() {
  // const getMain = (): Promise<IMainPageResponse> => {
  //   return cmsRequest.get<IMainPageResponse>({
  //     pageSlug: ECmsStoneEndpoints.MAIN,
  //     queryParams: "populate=deep,4",
  //   });
  // };
  //
  // const mainData: IMainPageResponse = await getMain();

  const getCommon = (): Promise<ICommonResponse> => {
    return cmsRequest.get<ICommonResponse>({
      pageSlug: ECmsStoneEndpoints.COMMON,
      queryParams: "populate=deep",
    });
  };

  // const main: IMainPageResponse = await getMain();
  const common: ICommonResponse = await getCommon();

  return <main className={styles.main}></main>;
}
