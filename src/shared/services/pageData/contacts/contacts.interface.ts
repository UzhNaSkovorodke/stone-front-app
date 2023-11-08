import {
  IDefaultAttributes,
  IDefaultData,
  IDefaultGeo,
  IDefaultImg,
  IDefaultLink,
  IDefaultPageResponse,
  TLocale,
} from '../default/default.interface'

export interface IContactsPageResponse extends IDefaultPageResponse {
  data: IContactsData
}

interface IContactsData extends IDefaultData {
  attributes: IContactsDataAttributes
}

export interface IContactsDataAttributes extends IDefaultAttributes {
  address: string | null
  coords: IDefaultGeo
  locale: TLocale
  localizations: unknown
  phone: IDefaultLink
  title: string | null
  contacts_block: IContactsBlock[]
}

export interface IContactsBlock {
  contact: IContact[]
  id: 1
  title: string | null
}

export interface IContact {
  id: number
  link: IContactLink
  text: string | null
}

export interface IContactLink {
  id: number
  img: IDefaultImg
  link: string | null
  text: string | null
}
