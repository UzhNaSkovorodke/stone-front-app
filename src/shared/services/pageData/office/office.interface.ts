import {
  IDefaultAttributes,
  IDefaultBlock,
  IDefaultButton,
  IDefaultData,
  IDefaultImg,
  IDefaultProjects,
  IDefaultSlide,
  IDefaultSpeakers,
} from 'shared/services/pageData/default/default.interface'

export interface IOfficeResponse {
  data: IOfficeData
}

export interface IOfficeData extends IDefaultData {
  attributes: IOfficeAttributes
}

export interface IOfficeAttributes extends IDefaultAttributes {
  BlockMain: IBlockMain
  BlockFilter: IBlockFilter
  BlockPromo: IBlockPromo[]
  BlockPromoMiddle: IBlockPromoMiddle
  BlockPromoBottom: IBlockPromoBottom
  Advantages: IBlockAdvantages
  BlockSpeakers: IBlockSpeakers
  stone_projects: IDefaultProjects
}

export interface IBlockSpeakers extends IDefaultBlock {
  speakers: IDefaultSpeakers
}

export interface IBlockPromoMiddle extends IDefaultBlock {
  button: unknown
}

export interface IBlockPromoBottom extends IDefaultBlock {
  button: unknown
  img: IDefaultImg
}

export interface IBlockPromo extends IDefaultBlock {
  button: IDefaultButton
  img: IDefaultImg
}

export interface IBlockMain extends IDefaultBlock {
  button: IButtonMain
}

export interface IBlockFilter extends IDefaultBlock {
  button: unknown
}

export interface IBlockAdvantages extends IDefaultBlock {
  slider: IDefaultSlide[]
}

interface IButtonMain {
  id: number
  text: string
  link: string
}
