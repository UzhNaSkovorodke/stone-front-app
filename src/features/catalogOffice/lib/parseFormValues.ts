import { CatalogCommercialFilter } from '../types/CatalogCommercialFilter'
import { FilterFormValues, Option } from '../types/FilterFormValues'

const strToNum = (s: string): number => parseFloat(s.replace(/\s/g, ''))
const extrackValue = (o: Option | any): string => o.value

export const parseFormValues = (v: FilterFormValues): CatalogCommercialFilter => {
  return {
    ...v,
    minPrice: strToNum(v.minPrice),
    maxPrice: strToNum(v.maxPrice),
    areaMin: strToNum(v.areaMin),
    areaMax: strToNum(v.areaMax),
    minFloor: strToNum(v.minFloor),
    maxFloor: strToNum(v.maxFloor),
    minMeterPrice: strToNum(v.minMeterPrice),
    maxMeterPrice: strToNum(v.maxMeterPrice),
    minWorkPlacesCount: strToNum(v.minWorkPlacesCount),
    maxWorkPlacesCount: strToNum(v.maxWorkPlacesCount),
    locations: v.locations.map(extrackValue),
    selected: v.selected.map(extrackValue),
    years: (v.years as any).map(extrackValue),
    housing: v.house.map(extrackValue),
    businessType: v.businessType.map((b: any) => strToNum(b)),
    isCorner: v.isCorner === '1' ? true : v.isCorner === '0' ? false : null,
    decoration: v.decoration === '1' ? true : v.decoration === '0' ? false : null,
    waterPipes: v.waterPipes === '1' ? true : v.waterPipes === '0' ? false : null,
    isCatering: v.isCatering === '1' ? true : v.isCatering === '0' ? false : null,
  } as any
}
