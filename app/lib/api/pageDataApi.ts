import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export enum ECmsStoneEndpoints {
  MAIN = 'portal-main',
  COMMON = 'portal-common',
  NEWS = 'stone-posts',
  PROJECTS = 'stone-projects',
  OFFICE = 'p-office-pl',
  DOM = 'p-dom-pl',
  COMMERCIAL_PROJECT = 'commercial-project-pages',
  DOM_PROJECT = 'dom-project-page-betas',
  PROJECT_STATUSES = 'pstatuses',
  DOCUMENTS = 'p-document',
  CONTACTS = 'Poratal-contact',
  INVESTMENTS = 'p-investment',
  PROPERTY_SERVICE = 'p-service',
  POINT_TYPES = 'poi-types',
  STANDARTS = 'standarts',
  PURCHASE_TERMS = 'p-purchase',
  LOYALTY = 'p-loyalty',
}

export interface IRequestParams {
  pageSlug?: ECmsStoneEndpoints;
  objectSlug?: string;
  queryParams?: string;
  config?: AxiosRequestConfig;
  filter?: Array<{
    param: string,
    val: string
  }> | null
}

export const cmsRequest = {
  get: <T>(query: IRequestParams) => {
    const filter = query.filter?.reduce((acc, cur) => {
      acc += (acc ? '&' : '') + 'filters' + cur.param + '=' + cur.val
      return acc
    }, '')
    let url = `${query.pageSlug ?? ''}${query.objectSlug ? `/${query.objectSlug}` : ''}?${query.queryParams ? query.queryParams : ''}${query.filter ? '&' + filter : ''}`
    // ДЛЯ ОТЛАДКИ ЗАПРОСОВ К STRAPI
    // console.log('запрос ', url)
    return cmsStone.get<T>(
      url,
      query.config,
    ).then(({ data }) => data)
  },
}

const cmsStone: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}/api`,
})
