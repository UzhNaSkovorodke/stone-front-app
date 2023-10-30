import {
  IDefaultAttributes,
  IDefaultData,
  IDefaultPageResponse,
} from '../default/default.interface'

export interface IPurchaseTermsResponse extends IDefaultPageResponse {
  data: IPurchaseTermsData
}

interface IPurchaseTermsData extends IDefaultData {
  attributes: IPurchaseTermsDataAttributes
}

export interface IPurchaseTermsDataAttributes extends IDefaultAttributes {
  BlockHeader: IBlockHeader
  PurchaseCards: IPurchaseCard[]
}

export interface IBlockHeader {
  title: string
  text: string
}

export interface IPurchaseCard {
  icon: {
    data: {
      attributes: {
        url: string
      }
    }
  },
  title: string,
  characteristics: {
    title: string,
    text: string,
  }[],
  note?: string,
  messageComagic: string,
  btn: string,
  options: {
    img: {
      data: {
        attributes: {
          url: string
        }
      }
    }
    title: string,
    text: string
    subText?: string
  }[]
}
