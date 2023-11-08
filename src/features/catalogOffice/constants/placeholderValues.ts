import { FilterFormValues } from '../types/FilterFormValues'

// Дефолтные значения фильтра до загрузки данных из api
export const PLACEHOLDER_VALUES: FilterFormValues = {
  type: ['1'],
  minPrice: '',
  maxPrice: '',
  minMeterPrice: '',
  maxMeterPrice: '',
  priceType: 'common',
  locations: [],
  areaMin: '',
  areaMax: '',
  years: [],
  selected: [],
  house: [],
  minFloor: '',
  maxFloor: '',
  minWorkPlacesCount: '',
  maxWorkPlacesCount: '',
  isCorner: null,
  decoration: null,
  waterPipes: null,
  isCatering: null,
  features: [],
  businessType: [],
}
