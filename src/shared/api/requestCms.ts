import axios, { AxiosRequestConfig } from 'axios'
import { camelize } from '../utils/camelize'

const axtask = axios.create({
  baseURL: 'https://cms.stonehedgecompany.com/api',
})

axtask.interceptors.response.use(camelize)

export const requestCms = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axtask.get<T>(url, config).then(({ data }) => data),
  post: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    axtask.post<T>(url, body, config).then(({ data }) => data),
  put: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    axtask.put<T>(url, body, config).then(({ data }) => data),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axtask.delete<T>(url, config).then(({ data }) => data),
}
