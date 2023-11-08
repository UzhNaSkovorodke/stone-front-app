import { IPointTypesData } from '../pointTypes/pointTypes.interface'

// Интерфейсы дефолтных компонентов из Strapi
export interface IDefaultPageResponse {
  data: IDefaultData
  meta: any
}

export interface IDefaultData {
  id: number
  attributes: IDefaultAttributes
}

export interface IDefaultAttributes {
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface IDefaultBlock {
  id: number
  text: string
  title: string
  link?: {
    text: string
    link: string
    img: {
      data: {
        attributes: {
          url: string
          width: number
          height: number
        }
      }
    }
  }[]
}

export interface IDefaultButton {
  text: string
  link: string
  img: string
}

export interface IDefaultLinkBlock {
  id: number
  title: string
  link: IDefaultLink[]
}

export interface IDefaultLink {
  id: number
  link: string
  text: string
}

export interface IDefaultSlide {
  id: number
  img: IDefaultImg
  note: string
  sub_text: string
  text: string
  title: string
  mediaUrl: string
}

export interface IDefaultMetro {
  color: string
  id: number
  station: string
  time_from: number
}

export interface IDefaultGeo {
  id: number
  lat: string
  long: string
}

export interface IDefaultColSection {
  col: IDefaultColSectionCol[]
  id: number
  title: string | null
}

export interface IDefaultColSectionCol {
  id: number
  img: IDefaultImg
  imgSm?: IDefaultImg
  subText: string | null
  text: string | null
  title: string | null
}

export type TLocale = 'ru' | 'en'

// Обогащенные дефолтные интерфейсы для конкретных блоков/свойств Strapi

export interface IDefaultCard extends IDefaultColSectionCol {
  bgColor: string | null
}

export interface IDefaultSlideWithVideo extends IDefaultSlide {
  mediaUrl: string
}

export interface IDefaultImg {
  data: IDefaultImgData
}

export interface IDefaultExtraImg {
  data: IDefaultImgData[]
}

export interface IDefaultImgData extends IDefaultData {
  attributes: IDefaultImgAttributes
}

export interface IDefaultImgAttributes extends IDefaultAttributes {
  alternativeText: unknown
  caption: unknown
  ext: string
  formats: unknown
  hash: string
  height: number
  mime: string
  name: string
  previewUrl: unknown
  provider: string
  provider_metadata: unknown
  size: number
  url: string
  width: number
}

export interface IDefaultPStatuses {
  data: IDefaultPStatusData[]
}

export interface IDefaultPStatus {
  data: IDefaultPStatusData
  id: number
}

export interface IDefaultPStatusData extends IDefaultData {
  attributes: IDefaultPStatusDataAttributes
}

export interface IDefaultPStatusDataAttributes extends IDefaultAttributes {
  color: string | null
  img: IDefaultImg
  slug: string | null
  title: string | null
}

export interface IDefaultProject {
  data: IDefaultProjectData
}

export interface IDefaultProjects {
  data: IDefaultProjectData[]
}

export interface IDefaultProjectData extends IDefaultData {
  id: number
  attributes: IDefaultProjectDataAttributes
}

export interface IDefaultProjectDataAttributes extends IDefaultAttributes {
  address: string | null
  area: number | null
  class: string | null
  description: string | null
  extraImg: IDefaultExtraImg
  features: IDefaultProjectDataAttributesFeatures
  geo: IDefaultGeo
  img: IDefaultImg
  pinImg: IDefaultImg
  locale: TLocale
  localizations: unknown
  logo_img: unknown
  masterPlanImg: IDefaultImg
  metro: IDefaultMetro[]
  pois: IDefaultDataPoint
  projectUuid: string
  portalUuid: string
  pstatus: IDefaultPStatus
  title: string | null
  type: string | null
  year: number | null
}

export interface IDefaultProjectDataAttributesFeatures {
  data: IDefaultProjectDataAttributesFeaturesData[]
}

export interface IDefaultProjectDataAttributesFeaturesData extends IDefaultData {
  attributes: IDefaultProjectDataAttributesFeaturesDataAttributes
}

export interface IDefaultProjectDataAttributesFeaturesDataAttributes extends IDefaultAttributes {
  feature: string | null
  portalId: string | null
  category: string | null
  tag: boolean
  img: {
    data: {
      attributes: {
        url: string
        width?: number
        height?: number
      }
    }
  }
}

export interface IDefaultDataPoint {
  data: IDefaultPoint[]
}

export interface IDefaultPoint {
  attributes: IDefaultPointAttributes
}

export interface IDefaultPointAttributes extends IDefaultAttributes {
  geo: IDefaultGeo
  img: IDefaultImg
  poi_type: IDefaultPointType
  title: string | null
  stone_project: IDefaultProject
}

export interface IDefaultPointType {
  data: IPointTypesData
}

export interface IDefaultSpeakers {
  data: IDefaultSpeakersData[]
}

export interface IDefaultSpeakersData extends IDefaultData {
  attributes: IDefaultSpeakersAttributes
}

export interface IDefaultSpeakersAttributes extends IDefaultAttributes {
  text: string
  sub_text: string
  speaker_name: string
  img: any
}
