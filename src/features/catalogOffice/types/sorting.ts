import { SORT_OPTIONS } from '../constants/sorting'

export type Sorting = (typeof SORT_OPTIONS)[number]['value']
