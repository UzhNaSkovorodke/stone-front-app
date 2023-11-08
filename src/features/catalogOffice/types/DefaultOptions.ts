import { BusinessTypes } from 'shared/types/lots'
import { Option } from './FilterFormValues'

export interface DefaultOptions {
  selected:
    | {
        value: string
        label: string
        disabled: boolean
      }[]
    | []
  locations:
    | {
        label: string
        value: string
        disabled?: boolean
      }[]
    | []
  features:
    | {
        label: string
        value: string
        disabled: boolean
      }[]
    | []
  businessType: BusinessTypes | Option[] | [] | string[]
  house:
    | {
        label: string
        value: string
        disabled?: boolean
      }[]
    | string[]
  years:
    | {
        label: string
        value: string
        disabled?: boolean
      }[]
    | []
    | string
  isCorner: boolean | string | null
  decoration: boolean | string | null
  waterPipes: boolean | string | null
  isCatering: boolean | string | null
  priceType?: string
}

export const DEFAULT_OPTIONS: DefaultOptions = {
  selected: [],
  locations: [],
  features: [],
  businessType: [],
  years: [],
  house: [],
  isCorner: null,
  decoration: null,
  waterPipes: null,
  isCatering: null,
}
