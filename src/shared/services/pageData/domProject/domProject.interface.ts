import {
  IDefaultAttributes,
  IDefaultColSectionCol,
  IDefaultImg,
  IDefaultLink,
  IDefaultMetro,
  IDefaultProjectData,
  IDefaultSlide,
} from '../default/default.interface'
export interface IDomProjectFilterResponse {
  data: Array<IDomProjectData>
  meta: any
}

export interface IDomProjectResponse {
  data: IDomProjectData
}

export interface IDomProjectData {
  attributes: IDomProjectAttributes
}

export interface IDomProjectAttributes extends IDefaultAttributes {
  BlockAdvantages: IDomProjectBlockAdvantages
  BlockForm: IDomBlockForm
  BlockFormBooking: IDomBlockFormBooking
  BlockInvestment: IDomBlockInvestment
  BlockPromo: IDomBlockPromo
  BlockSlider: IDefaultSlide[]
  project: any
}

export interface IDomProjectBlockAdvantages {
  id: number
  advantages: IDefaultSlide[]
  title: string | null
}

export interface IDomProjectBlockSlider {
  id: number
  img: IDefaultImg
  note: string
  sub_text: string
  text: string
  title: string
  mediaUrl: string
}

export interface IDomBlockForm {
  address: string | null
  buttonText: string | null
  id: number
  img: unknown
  metro: IDefaultMetro[]
  policyText: string | null
  title: string | null
}

export interface IDomBlockFormBooking {
  buttonText: string | null
  id: number
  policyText: string | null
  title: string | null
}

export interface IDomBlockInvestment {
  col: IDefaultColSectionCol[]
  id: number
  title: string | null
}

export interface IDomBlockPromo {
  button: IDefaultLink
  id: number
  text: string | null
  title: string | null
}

export interface IDomProject {
  data: IDefaultProjectData[]
}
