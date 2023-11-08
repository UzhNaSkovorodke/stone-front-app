import {
  IDefaultData,
  IDefaultProjectData,
  IDefaultProjectDataAttributes,
} from 'shared/services/pageData/default/default.interface'

export interface IProjectsResponse {
  data: IDefaultProjectData[]
  meta: any
}

export interface IProject extends IDefaultData {
  id: number
  attributes: IDefaultProjectDataAttributes
}
