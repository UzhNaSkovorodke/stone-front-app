import { IDefaultButton, IDefaultImg } from 'shared/services/pageData/default/default.interface'

export interface IBlockIntro {
  icons: ICharacteristics[]
  id: number
  title: string
}

export interface ICharacteristics {
  title: string
  img: IDefaultImg
}

export interface IBlockPersonal {
  conditionals: {
    title: string
    text: string
    percent: string
  }[]
  icons: ICharacteristics[]
  main: {
    id: number
    text: string
    title: string
    img: IDefaultImg
    button: IDefaultButton
  }
  title: string
  mobTitle: string
}

export interface IBlockReferrer {
  title: string
  text: string
  headerBtn: {
    title: string
    text: string
    button: IDefaultButton
  }
  steps: {
    text: string
  }[]
  img: {
    title: string
    img: IDefaultImg
  }
}
