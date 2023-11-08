import {
  IDefaultAttributes,
  IDefaultCard,
  IDefaultData,
  IDefaultImg,
  IDefaultImgData,
  IDefaultSlide,
} from '../default/default.interface'

export interface IStandartsResponse {
  data: IStandarts[]
}

export interface IStandarts extends IDefaultData {
  attributes: IStandartsAttributes
}

export interface IStandartsAttributes extends IDefaultAttributes {
  BlockAdvantages: IBlockAdvantages
  BlockGallery: IBlockGallery
  BlockOpportunity: IBlockOpportunity
  BlockSlider: IBlockSlider
  slug: string | null
}

export interface IBlockAdvantages {
  advantages: IDefaultCard[]
  id: number
  title: string | null
}

export interface IBlockOpportunity {
  cols: IDefaultCard[]
  id: number
  title: string | null
}

export interface IBlockSlider {
  id: number
  slider: IDefaultSlide[]
  title: string | null
}

export interface IBlockGallery {
  gallery: IGallery
  id: number
  logo_img: IDefaultImg
  title: string | null
}

export interface IGallery {
  id: number
  imagesSm: IGalleryImagesSm
  imges: IImges
}

export interface IGalleryImagesSm {
  data: IDefaultImgData[]
}

export interface IImges {
  data: IDefaultImgData[]
}
