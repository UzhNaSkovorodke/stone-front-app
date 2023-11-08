import { CatalogCommercialFilter } from '../types/CatalogCommercialFilter'
// Тип помещения: filter[type] +
// Цена от/до (общая): filter[price]
// Цена от/до (метр): filter[meter_price] +
// Площадь от/до: filter[area] +
// Готовность: filter[year] +
// Проект: filter[selected] +
// Башня/корпус: filter[house] +
// Этаж от/до: filter[floor] +
// Количество рабочих мест от/до: +
// Локация: filter[location] +
// Угловое (да/нет): +
// Отделка (да/нет): +
// Мокрая точка (да/нет): +
// Под общепит (да/нет): +
// Сортировка: sort (lots.selling_price, lots.selling_price_per_meter, lots.area, lots.building_year) +
//
// Дом/Офис: ???
// Особенности (выход в парк/высокий трафик): ???
// Дополнительные сервисы (фитнесс/столовая/конференц зал): ???

export const parseFilterToQuery = (
  f: CatalogCommercialFilter & { selected?: string[] | undefined },
  features: string[],
  isPriceChanged: boolean,
  isAreaChanged: boolean,
  isProjectChanged: boolean,
  isLocationChanged: boolean,
  isHouseChanged: boolean,
  isYearChanged: boolean,
  isFloorChanged: boolean,
  isWorkSpaceChanged: boolean
): string => {
  const params: { [key: string]: string | number | string[] } = {
    'filter[direction]': '1',
    'filter[type]': f.type.sort(),
    // 'filter[business_type]': f.businessType.toString(),
  }

  if (isYearChanged && f.years.length > 0) {
    params['filter[year]'] = f.years.map((m: any) => m.label).toString()
  }

  if (isWorkSpaceChanged) {
    params['filter[places]'] = `${f.minWorkPlacesCount},${f.maxWorkPlacesCount}`
  }

  if (isHouseChanged) {
    params['filter[house]'] = f.house.map((m: any) => m.label).toString()
  }

  if (isFloorChanged) {
    params['filter[floor]'] = `${f.minFloor},${f.maxFloor}`
  }

  if (isAreaChanged) {
    params['filter[area]'] = `${f.areaMin},${f.areaMax}`
  }

  if (isLocationChanged && f.locations.length > 0) {
    params['filter[metro]'] = f.locations.map((m: any) => m.label).toString()
  }

  if (isProjectChanged) {
    if (f.selected) {
      params['filter[selected]'] = f.selected.map((m: any) => m.value).toString()
    }
  }

  if (features) {
    if (f.features && f.features !== null && features.length > 0) {
      params['filter[features]'] = f.features.toString()
    }
  }

  if (isPriceChanged) {
    if (f.priceType === 'common') {
      params['filter[price]'] = `${f.minPrice},${f.maxPrice}`
    } else if (f.priceType === 'metre') {
      params['filter[meter_price]'] = `${f.minMeterPrice},${f.maxMeterPrice}`
    }
  }

  if ((typeof f.isCorner === 'boolean' || f.isCorner === '1') && f.isCorner !== null) {
    params['filter[is_corner]'] = f.isCorner.toString()
  }

  if ((typeof f.isCatering === 'boolean' || f.isCatering === '1') && f.isCatering !== null) {
    params['filter[is_catering]'] = f.isCatering.toString()
  }

  if ((typeof f.decoration === 'boolean' || f.decoration === '1') && f.decoration !== null) {
    params['filter[decoration]'] = f.decoration.toString()
  }

  if ((typeof f.waterPipes === 'boolean' || f.waterPipes === '1') && f.waterPipes !== null) {
    params['filter[water_pipes]'] = f.waterPipes.toString()
  }

  return Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
}
