import {
  IDefaultAttributes,
  IDefaultBlock,
  IDefaultCard,
  IDefaultColSection,
  IDefaultData,
  IDefaultImg,
  IDefaultPageResponse,
  IDefaultProjects,
} from '../default/default.interface'

export interface IInvestmentsPageResponse extends IDefaultPageResponse {
  data: IInvestmentsData
}

export interface IInvestmentsData extends IDefaultData {
  attributes: IInvestmentsDataAttributes
}

export interface IInvestmentsDataAttributes extends IDefaultAttributes {
  BlockAdvices: IBlockAdvices
  BlockForm: IBlockForm
  BlockMain: IBlockMain
  BlockPromoSug1: IDefaultBlock
  BlockPromoSug2: IDefaultBlock
  stone_projects: IDefaultProjects
}

export interface IBlockAdvices {
  id: number
  tabs: IDefaultColSection[]
  title: string | null
}

export interface IBlockForm extends IDefaultBlock {
  buttonText: string | null
  img: IDefaultImg
  policyText: string | null
  phone?: string
}

export interface IBlockMain {
  BlockStrategies: IBlockStrategies
  cards: IDefaultCard[]
  header: IDefaultBlock
  id: number
}

export interface IBlockStrategies {
  cards: IDefaultCard[]
  id: number
  title: string | null
}
