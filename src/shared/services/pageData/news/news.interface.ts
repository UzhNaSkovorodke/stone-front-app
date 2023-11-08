import { IDefaultAttributes, IDefaultData } from '../default/default.interface'

export interface INewsResponse {
  data: INewsData[]
}

export interface INewsData extends IDefaultData {
  attributes: INewsAttributes
}

interface INewsAttributes extends IDefaultAttributes {
  annonce: unknown
  date: string
  img: unknown
  seo: unknown
  slug: string
  text: unknown
  title: string
  type: unknown
}
