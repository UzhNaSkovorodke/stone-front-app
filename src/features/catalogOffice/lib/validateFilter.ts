import { FilterFormValues } from '../types/FilterFormValues'
import { parseFormValues } from './parseFormValues'

export const validateFilter = (values: FilterFormValues, defaults: FilterFormValues): boolean => {
  if (
    !values.areaMin ||
    !values.areaMax ||
    !values.minFloor ||
    !values.maxFloor ||
    !values.minWorkPlacesCount ||
    !values.maxWorkPlacesCount
  )
    return false

  if (values.priceType === 'common' && (!values.minPrice || !values.maxPrice)) return false
  if (values.priceType === 'metre' && (!values.minMeterPrice || !values.maxMeterPrice)) return false

  const v = parseFormValues(values)
  const d = parseFormValues(defaults)

  if (v.priceType === 'common') {
    if (v.minPrice < d.minPrice) return false
    if (v.maxPrice > d.maxPrice) return false
    if (v.minPrice > v.maxPrice) return false
  }

  if (v.priceType === 'metre') {
    if (v.minMeterPrice < d.minMeterPrice) return false
    if (v.maxMeterPrice > d.maxMeterPrice) return false
    if (v.minMeterPrice > v.maxMeterPrice) return false
  }

  if (v.areaMin < d.areaMin) return false
  if (v.areaMax > d.areaMax) return false
  if (v.areaMin > v.areaMax) return false

  if (v.minFloor < d.minFloor) return false
  if (v.maxFloor > d.maxFloor) return false
  if (v.minFloor > v.maxFloor) return false

  if (v.minWorkPlacesCount < d.minWorkPlacesCount) return false
  if (v.maxWorkPlacesCount > d.maxWorkPlacesCount) return false
  if (v.minWorkPlacesCount > v.maxWorkPlacesCount) return false

  return true
}
