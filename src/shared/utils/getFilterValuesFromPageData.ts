import { IFilterFormValues } from 'src/features/commercialPage/Filter/filterForm.interface'
import { LotPageData, LotProject } from '../types/lots'

export const getFilterValuesFromPageData = (
  pageData: LotPageData | undefined,
  allProjects: LotProject[] | null,
  projects: string[]
): Partial<IFilterFormValues> => {
  return {
    minPrice: pageData?.minPrice || '',
    maxPrice: pageData?.maxPrice || '',
    areaMin: pageData?.areaMin || '',
    areaMax: pageData?.areaMax || '',
    selected: allProjects
      ?.filter((i) => projects.includes(i.name))
      .map((project) => ({ value: project.id.toString(), label: project.name, disabled: false })),
    type: pageData?.types.map((i) =>
      i === 'Офис' ? '1' : i === 'Крупные лоты' ? '2' : i === 'Ритейл' ? '3' : '4'
    ),
    minMeterPrice: pageData?.minMeterPrice || '0',
    maxMeterPrice: pageData?.maxMeterPrice || '1000000',
    maxFloor: pageData?.maxFloor?.toString() || '100',
    minFloor: pageData?.minFloor?.toString() || '0',
    maxWorkPlacesCount: pageData?.maxWorkPlacesCount?.toString() || '1500',
    minWorkPlacesCount: pageData?.minWorkPlacesCount?.toString() || '0',
    features: pageData?.features.map((f: any) => {
      return { label: f, value: f, disabled: false }
    }),
    businessType: pageData?.businessType as any,
    locations: pageData?.metro.map((l: any) => ({ value: l, label: l })) || [],
    years: pageData?.years.map((i) => {
      return { label: `${i}`, value: `${i}`, disabled: false }
    }),
    house: pageData?.house.map((h) => {
      return { label: `${h}`, value: `${h}`, disabled: false }
    }),
  }
}
