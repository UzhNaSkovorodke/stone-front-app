import { Dispatch, SetStateAction } from 'react'

export interface ILegendModalElement {
  title: string
  icon: string
  isChecked: boolean
  handleCheck: Dispatch<SetStateAction<boolean>>
}

export interface ILegendPin {
  coordinates: number[]
  text: string | null
}
