import { FilterFormValues, Option } from './../types/FilterFormValues'
import { DefaultOptions } from '../types/DefaultOptions'
import { BusinessTypes, LotProject } from 'shared/types/lots'

export const useDefaultOptions = (
  filter: Partial<FilterFormValues> | undefined | any,
  store: any,
  allProjects: LotProject[],
  allBusinessTypes: BusinessTypes | never[]
) => {
  const getDefaultOptions = (): DefaultOptions => {
    const defaultOptions: DefaultOptions = {
      selected: allProjects.map((i) => {
        return { label: `${i.name}`, value: `${i.id}`, disabled: false }
      }),
      locations:
        store.lots?.defaultInitialValues?.locations &&
        store?.lots?.defaultInitialValues?.locations?.length > 0
          ? store.lots.defaultInitialValues?.locations
          : filter
          ? filter.metro.map((i: string) => {
              return { label: i, value: i, disabled: false }
            })
          : [],
      features: filter
        ? filter.features.map((i: Option) => {
            return { label: `${i}`, value: `${i}`, disabled: false }
          })
        : [],
      businessType: Object.entries(allBusinessTypes).map((i) => {
        return { label: i[0], value: `${i[1]}`, disabled: false }
      }),
      years:
        store.lots?.defaultInitialValues?.years &&
        store?.lots?.defaultInitialValues?.years?.length > 0
          ? store.lots.defaultInitialValues?.years
          : filter
          ? filter.years.map((i: Option) => {
              return { label: `${i}`, value: `${i}`, disabled: false }
            })
          : [],
      house:
        store.lots?.defaultInitialValues?.house &&
        store?.lots?.defaultInitialValues?.house?.length > 0
          ? store.lots.defaultInitialValues?.house
          : filter
          ? filter.house.map((h: Option) => {
              return { label: h, value: h, disabled: false }
            })
          : [],
      priceType: 'common',
      isCorner: filter?.isCorner ? '1' : '0',
      isCatering: filter?.isCatering ? '1' : '0',
      waterPipes: filter?.waterPipes ? '1' : '0',
      decoration: filter?.decoration ? '1' : '0',
    }
    return defaultOptions
  }
  return { getDefaultOptions }
}
