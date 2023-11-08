// import { IFilterFormValues } from '@/features/commercialPage/Filter/filterForm.interface'
// import { Option } from '@/features/catalogOffice/types/FilterFormValues'
//
// export const getQueryFromFilter = (filter: IFilterFormValues): string => {
//   const params: { [key: string]: string } = {
//     'filter[type]': filter.type.toString(),
//     'filter[area]': `${filter.areaMin},${filter.areaMax}`,
//     'filter[price]': `${filter.minPrice},${filter.maxPrice}`,
//     'filter[selected]': filter.selected
//       .map((selectedOption: Option) => selectedOption.value)
//       .join(','),
//   }
//
//   return Object.entries(params)
//     .map(([key, value]) => `${key}=${value}`)
//     .join('&')
// }
