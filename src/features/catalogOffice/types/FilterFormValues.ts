import { BusinessTypes } from 'shared/types/lots'

export type Option = {
  label: string
  value: string
  disabled?: boolean
}

export interface FilterFormValues {
  type: string[]
  minPrice: string
  maxPrice: string
  minMeterPrice: string
  maxMeterPrice: string
  priceType: 'common' | 'metre'
  locations: Option[]
  areaMin: string
  areaMax: string
  years: Option[] | string
  selected: Option[]
  house: Option[] | string[]
  minFloor: string
  maxFloor: string
  minWorkPlacesCount: string
  maxWorkPlacesCount: string
  isCorner: string | null
  decoration: string | null
  waterPipes: string | null
  isCatering: string | null
  features: Option[] | string[]
  businessType: BusinessTypes | any
}
