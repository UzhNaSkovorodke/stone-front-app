// Id из страпи для связи
export enum ESaleStatusId {
  // Старт продаж
  DEFAULT = 2,
  // Скоро в продаже
  STATUS_SOON = 3,
  // В продаже
  STATUS_SALE = 1,
  // Продано
  STATUS_SOLD = 4,
}

export interface SaleStatusPropsInterface {
  value: string
  statusId: ESaleStatusId
}
