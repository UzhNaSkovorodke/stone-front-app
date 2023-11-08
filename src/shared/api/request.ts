import axios, { AxiosRequestConfig } from 'axios'
import { axiosStone } from '../services/axiosConfig'
import { camelize } from '../utils/camelize'

axiosStone.interceptors.response.use(camelize)

export const request = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosStone.get<T>(url, config).then(({ data }) => data),
  post: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    axiosStone.post<T>(url, body, config).then(({ data }) => data),
  put: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    axiosStone.put<T>(url, body, config).then(({ data }) => data),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosStone.delete<T>(url, config).then(({ data }) => data),
}

export const axtaskInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = axios.CancelToken.source()

  const promise = axiosStone({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}
