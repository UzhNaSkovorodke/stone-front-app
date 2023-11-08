import {
  IDefaultAttributes,
  IDefaultBlock,
  IDefaultData,
  IDefaultLink,
  IDefaultLinkBlock,
  IDefaultPageResponse,
  TLocale,
} from '../default/default.interface'

export interface ICommonResponse extends IDefaultPageResponse {
  data: ICommonData
}

export interface ICommonData extends IDefaultData {
  attributes: ICommonAttributes
}

export interface ICommonAttributes extends IDefaultAttributes {
  block_footer: IBlockFooter
  block_menu: IBlockMenu
  block_drop_menu: IDropMenuBlock
  locale: TLocale
  block_contactUs: IBlockContactUs
}

export interface IBlockContactUs {
  TelegramLink: IDefaultLink
  WhatsappLink: IDefaultLink
  PhoneLink: IDefaultLink
}

export interface IBlockMenu {
  commercial_realestate: string
  id: number
  phone: string
  residential_realestate: string
  phoneLink: IDefaultLink
}

export interface IBlockFooter {
  col1: IDefaultBlock
  col2: IFooterLinkBlock
  col3: IFooterLinkBlock
  col4: IFooterLinkBlock
  follow_us: IFollowUsBlock
  get_news: IGetNewsBlock
}

export interface IFooterLinkBlock {
  id: number
  title: string
  link: IDefaultLink[]
}

interface IFollowUsBlock extends IDefaultBlock {
  button: IDefaultLink
}

interface IGetNewsBlock {
  header_title: string
  id: number
  input_placeholder: string
  text: string
}

interface IDropMenuBlock {
  id: number
  Links: IDefaultLinkBlock[]
  EmailLink: IDefaultLink
  TelegramLink: IDefaultLink
  PhoneLink: IDefaultLink
}
