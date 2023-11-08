import { requestCms } from '../api/requestCms'

export interface ProjectResponse {
  data: any
}

export interface MetroItem {
  id: number
  color: string
  station: string
  timeFrom: number
}

export interface Geo {
  id: number
  lat: string
  long: string
}

export const getProjects = () => requestCms.get<ProjectResponse>('/stone-projects?populate=deep')
