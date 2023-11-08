import { useMemo } from 'react'
import { FilterFormValues, Option } from './../types/FilterFormValues'

export interface FilterOptions {
  locations: FilterFormValues['locations']
  years: FilterFormValues['years']
  selected: FilterFormValues['selected']
  housing: FilterFormValues['house']
  isCorner: boolean
  isCatering: boolean
  decoration: boolean
  waterPipes: boolean
  features: Option[]
  businessType: Option[]
}

export const useFilterOptions = (
  filter: Partial<FilterFormValues> | undefined | any,
  defaultValues: FilterFormValues | undefined | any
): FilterOptions => {
  return useMemo(() => {
    const projectsValues = new Set<string>(filter?.selected?.map((s: any) => s.value) || [])
    const yearsValues = new Set<string>(filter?.years?.map((s: any) => s.value) || [])
    const locationsValues = new Set<string>(filter?.locations?.map((s: any) => s.value) || [])
    const housingValues = new Set<string>(filter?.housing?.map((s: any) => s.value) || [])
    const featuesValues = new Set<string>(filter?.features || [])
    const businessTypeValues = new Set<string>(filter?.businessType || [])

    return {
      selected:
        defaultValues?.selected.map((v: any) => ({
          ...v,
          disabled: projectsValues.has(v.value) === false,
        })) || [],
      years:
        defaultValues?.years.map((v: any) => ({
          ...v,
          disabled: yearsValues.has(v.value) === false,
        })) || [],
      locations:
        defaultValues?.locations.map((v: any) => ({
          ...v,
          disabled: locationsValues.has(v.value) === false,
        })) || [],
      housing:
        defaultValues?.housing.map((v: any) => ({
          ...v,
          disabled: housingValues.has(v.value) === false,
        })) || [],
      isCorner: filter?.isCorner === '1',
      isCatering: filter?.isCatering === '1',
      decoration: filter?.decoration === '1',
      waterPipes: filter?.waterPipes === '1',
      features:
        defaultValues?.features.map((f: any) => ({
          value: f,
          label: f,
          disabled: !featuesValues.has(f),
        })) || [],
      businessType:
        defaultValues?.businessType.map((f: any) => ({
          value: f,
          label: f,
          disabled: !businessTypeValues.has(f),
        })) || [],
    }
  }, [filter, defaultValues])
}
