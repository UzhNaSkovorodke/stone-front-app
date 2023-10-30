import {
  IDefaultData,
  IDefaultProjectData,
  IDefaultProjectDataAttributes,
} from "../default/default.interface";

export interface IProjectsResponse {
  data: IDefaultProjectData[];
  meta: any;
}

export interface IProject extends IDefaultData {
  id: number;
  attributes: IDefaultProjectDataAttributes;
}
