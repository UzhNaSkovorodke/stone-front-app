import { FilterFormValues } from '../types/FilterFormValues'
import { LotProject } from 'shared/types/lots'
import { LotPageData } from 'shared/types/lots'

export const getFormFilterFromPageData = (
  filter: LotPageData | undefined,
  allProjects: LotProject[] | null,
  projects: string[]
): Partial<FilterFormValues> => {
  return {
    type: filter?.types.map((i) =>
      i === 'Офис' ? '1' : i === 'Крупные лоты' ? '2' : i === 'Ритейл' ? '3' : '4'
    ),
    minPrice: filter?.minPrice || '0',
    maxPrice: filter?.maxPrice || '1000000000',
    minMeterPrice: filter?.minMeterPrice || '0',
    maxMeterPrice: filter?.maxMeterPrice || '1000000',
    areaMin: filter?.areaMin || '0',
    areaMax: filter?.areaMax || '200000',
    selected: allProjects
      ?.filter((i) => projects.includes(i.name))
      .map((project) => ({
        value: project.id.toString(),
        label: project.name,
        disabled: false,
      })),
    maxFloor: filter?.maxFloor?.toString() || '100',
    minFloor: filter?.minFloor?.toString() || '0',
    maxWorkPlacesCount: filter?.maxWorkPlacesCount?.toString() || '1500',
    minWorkPlacesCount: filter?.minWorkPlacesCount?.toString() || '0',
    features: filter?.features.map((f: any) => {
      return { label: f, value: f, disabled: false }
    }),
    businessType: filter?.businessType as any,
    locations: filter?.metro.map((l: any) => ({ value: l, label: l })) || [],
    years: filter?.years.map((i) => {
      return { label: `${i}`, value: `${i}`, disabled: false }
    }),
    house: filter?.house.map((h) => {
      return { label: `${h}`, value: `${h}`, disabled: false }
    }),
  }
}
