import {
  IDefaultAttributes,
  IDefaultCard,
  IDefaultData,
  IDefaultLink,
} from '../default/default.interface'

export interface IPropertyServiceResponse {
  data: IPropertyServiceData
}

export interface IPropertyServiceData extends IDefaultData {
  attributes: IPropertyServiceDataAttributes
}

export interface IPropertyServiceDataAttributes extends IDefaultAttributes {
  Button: IDefaultLink
  services: IDefaultCard[]
  text: string | null
  title: string | null
}
