import { FilterFormValues, Option } from './FilterFormValues'

export interface CatalogCommercialFilter {
  type: string[]
  minPrice: number
  maxPrice: number
  minMeterPrice: number
  maxMeterPrice: number
  priceType: FilterFormValues['priceType']
  locations: string[]
  areaMin: number
  areaMax: number
  years: string[] | Option[]
  selected: string[]
  house: string[]
  minFloor: number
  maxFloor: number
  minWorkPlacesCount: number
  maxWorkPlacesCount: number
  isCorner: boolean | null
  decoration: boolean | null
  waterPipes: boolean | null
  isCatering: boolean | null
  features: string[]
  businessType: number[]
}
