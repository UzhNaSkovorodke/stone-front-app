import { Option } from 'src/features/catalogOffice/types/FilterFormValues'

export interface IFilterFormValues {
  type: string[]
  minPrice: string
  maxPrice: string
  areaMin: string
  areaMax: string
  selected: Option[]
  minMeterPrice?: string
  maxMeterPrice?: string
  maxFloor?: string
  minFloor?: string
  maxWorkPlacesCount?: string
  minWorkPlacesCount?: string
  locations?: Option[]
  years: Option[] | string
  house: Option[] | string[]
  isCorner?: string | null
  decoration?: string | null
  waterPipes?: string | null
  isCatering?: string | null
  features?: Option[] | string[]
  businessType?: any
}
