import { request } from '../api/request'
import { LotCardData } from '../types/lotCard'
import { BusinessTypes, Lot, LotPageData, LotProject, RoomType } from '../types/lots'

export interface LotsResponse {
  /** Список лотов */
  data: Lot[]
  /** Фильтры */
  filter: {
    /** Все существующие проекты */
    allProjects: LotProject[]
    /** Проекты */
    projects: LotProject[]
    /** Значения фильтров */
    pageData: LotPageData
    /** Типы помещений */
    type: RoomType
    /** Дополнительные особенности */
    businessTypes: BusinessTypes
    /** Все бизнес типы */
    allBusinessTypes: BusinessTypes
  }
  meta: {
    currentPage: number
    from: number
    lastPage: number
    perPage: number
    to: number
    total: number
  }
  status: string
  message: string
  errors: string
}

export const getLots = (queryString: string) =>
  request.get<LotsResponse>(`/lots${queryString ? `?${queryString}` : ``}`)

interface LotResponse {
  data: LotCardData
  status: string
  message: string
  errors: string
}

export const PLACEMENT_TYPES: { [key: number]: string } = {
  1: 'Офис',
  2: 'Крупные лоты',
  3: 'Ритейл',
  4: 'Паркинг',
  5: 'Квартира',
  6: 'Пентхаус',
  7: 'Келлер',
}

export const LOT_STATUS = {
  SALE: 1,
  RESERVED: 2,
  SOLD_OUT: 3,
  RENTED: 4,
  BLOCKED: 5,
  DISABLED: 6,
}

export const getLot = (lotNumber: string) => request.get<LotResponse>(`/lots/${lotNumber}`)
