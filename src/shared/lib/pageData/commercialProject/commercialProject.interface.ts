import {
  IDefaultAttributes,
  IDefaultColSection,
  IDefaultColSectionCol,
  IDefaultData,
  IDefaultImg,
  IDefaultLink,
  IDefaultMetro,
  IDefaultProject,
  IDefaultProjectData,
  IDefaultSlide,
  IDefaultSlideWithVideo,
} from '../default/default.interface'

export interface ICommercialProjectFilterResponse {
  data: Array<ICommercialProjectData>
  meta: any
}

export interface ICommercialProjectResponse {
  attributes: ICommercialProjectAttributes
}

export interface ICommercialProjectData extends IDefaultData {
  attributes: ICommercialProjectAttributes
}

interface ICommercialProjectAttributes extends IDefaultAttributes {
  BlockAdvantages: ICommercialProjectBlockAdvantages
  BlockForm: ICommercialProjectBlockForm
  BlockInvestment: ICommercialProjectInvestment
  BlockMain: ICommercialProjectBlockMain
  BlockProgress: ICommercialProjectBlockProgress
  BlockPromo: ICommercialProjectBlockPromo
  BlockRecProjects: ICommercialProjectBlockRecProjects
  BlockSlider: IDefaultSlide[]
  BlockSolutions: { text: string | null }
  project: IDefaultProject
  slug: string
}

export interface ICommercialProjectBlockAdvantages {
  id: number
  slider: IDefaultSlide[]
  title: string | null
}

export interface ICommercialProjectBlockForm {
  address: string | null
  buttonText: string | null
  id: number
  img: IDefaultImg
  metro: IDefaultMetro[] | any
  policyText: string | null
  title: string | null
  phone?: string
}

export interface ICommercialProjectInvestment {
  forInvestment: ICommercialProjectInvestmentSectionForInvestment
  forMe: IDefaultColSection
  id: number
  title: string
}

export interface ICommercialProjectInvestmentSectionForInvestment {
  col: ICommercialProjectInvestmentSectionForInvestmentCol[]
  id: number
  title: string
}

export interface ICommercialProjectInvestmentSectionForInvestmentCol {
  title: string
  id: number
  col: IDefaultColSectionCol[]
}

export interface ICommercialProjectBlockMain {
  Slider: IDefaultSlide[]
  id: number
  promoText: string
}

export interface ICommercialProjectBlockProgress {
  id: number
  progress: IDefaultSlideWithVideo[]
  title: string
}

export interface ICommercialProjectBlockPromo {
  button: IDefaultLink
  id: number
  text: string | null
  title: string | null
}

export interface ICommercialProjectBlockRecProjects {
  id: number
  recProjects: ICommercialProjectRecProject
  title: string | null
}

interface ICommercialProjectRecProject {
  data: IDefaultProjectData[]
}
