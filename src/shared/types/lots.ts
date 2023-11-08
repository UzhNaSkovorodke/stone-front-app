export interface Lot {
  /** id Лота */
  id: number | string
  /** Название проекта */
  name?: string | null
  /** Квартал сдачи */
  buildingQuarter?: number | null
  /** uuid Лота из 1с */
  lotUuid: string
  /** UUID проекта */
  projectUuid: string | null
  /** Стоимость объекта недвижимости */
  sellingPrice: string | null
  /** Цена за квм */
  sellingPricePerMeter: string | null
  /** цена за метра квадратный за год за аренду */
  rentPricePerMeterPerYear: string | null
  /** аренда за месяц */
  rentPricePerMonth: string | null
  /** Размер скидки */
  discountVolume: number | null
  /** Цена со скидкой */
  discountedPrice: number | null
  /** дата освобождения лота */
  availableFrom: string | null
  /** дата, до которой должны быть выданы ключи */
  handoverKeys: string | null
  /** состояние лота: свободен, зарезервирован, продан, сдан в аренду, заблокирован, деактивирован */
  status: number | null
  /** Статус аренды лота */
  rentStatus: number | null
  /** название лота в 1С */
  number: string | null
  /** полный адрес лота (с корпусом) */
  address: string | null
  /** Тип помещения => Квартиры/Пентхаусы/Келлеры/Паркинг Офисы/Ритейл/Офисные Блоки/Паркинг */
  type: number | null
  /** направления, по которым продвигается этот лот */
  directions: string | null
  /** номер подъезда/секции */
  entrance: string | null
  /** Номер квартиры / офиса */
  doorNumber: string | null
  /** Площадь квартиры */
  area: string | null
  /** площадь кухни */
  kitchenArea: number | null
  /** Жилая площадь */
  livingArea: number | null
  /** Кол-во этажей */
  floorsNumber: number | null
  /** Этаж */
  floor: number | null
  /** Высота потолков */
  ceiling: string | null
  /** Этаж, с которого начинаются продаваемые лоты */
  saleFloorMin: number | null
  /** Этаж, на котором заканчиваются продаваемые лоты */
  saleFloorMax: number | null
  /** Количество комнат */
  roomsCount: number | null
  /** Количество спален */
  bedromsCount?: number | null
  /** Корпус */
  housing: string | null
  /** Секция */
  section: string | null
  /** Очередь строительства */
  buildStage: number | null
  /** угловое? */
  isCorner: boolean | null
  /** общепит? */
  isCatering: boolean | null
  /** является ли лот отдельно стоящим зданием */
  isDetachedBuilding: boolean | null
  /** Наличие телефона */
  isPhone: boolean | null
  /** в ипотеку */
  isMortgage: boolean | null
  /** мусоропровод */
  isGarbageTube: boolean | null
  /** Является ли лот пентхаусом */
  isPenthouse: boolean | null
  /** Является ли лот апартаментом */
  isApart: boolean | null
  /** Является ли лот двухуровневым */
  isDoubleLevel: boolean | null
  /** Есть ли пандус */
  isRamp: boolean | null
  /** Близко ли вход к лифтовой группе */
  isCloseToLift: boolean | null
  /** Занят ли лот */
  isOccupied: boolean | null
  /** Является ли лот ГАБ */
  isGab: boolean | null
  /** Есть ли отделка */
  isFacing: boolean | null
  /** Особенности квартиры */
  features: LotFeature[] | null
  /** Количество пассажирских лифтов */
  liftPassenger: number | null
  /** Количество грузовых лифтов */
  liftService?: number | null
  /** Количество балконов */
  balcony: number | null
  /** Количество лоджий */
  loggia: number | null
  /** Состояние помещения */
  condition: string | null
  /** Тип входа в помещений */
  inputType?: string | null
  /** Отделка */
  decoration: string | null
  /** Тип планировки */
  layout: string | null
  /** Тип ремонта */
  repairType: string | null
  /** количество стояков с водой */
  waterPipesCount: number[] | null
  /** количество рабочих мест */
  workPlacesCount: number | null
  /** Количество совместных санузлов */
  combinedWcsCount: number | null
  /** Возможное назначение */
  speciality: number | null
  /** Куда выходят витрины */
  showcaseWindows: string | null
  /** Вид из окна */
  windowView: string | null
  /** Promo метки */
  promo: LotPromo[] | null
  /** Promo текст */
  promoText: string | null
  /** Ссылка на картинку */
  interiorPlanImg?: string | null
  /** Ссылка на картинку */
  floorPlanImg: string | null
  /** Ссылка на картинку */
  sitPlanImg: string | null
  /** Дата создания */
  createdAt?: string
  /** Дата обновления */
  updatedAt?: string
}

interface LotPromo {
  /** Промо текст */
  val: string
  /** Идентификатор */
  slug: string
  /** Категория */
  category: string
  /** Ссылка на иконку */
  icoImg: string
  /** hex цвет */
  color: string
}

interface LotFeature {
  /** Текст */
  val: string
  /** Категория */
  category: string
  /** Ссылка на иконку */
  icoImg: {
    attributes: {
      url: string
    }
  }
  /** Идентификатор */
  slug: string
}

export interface LotProject {
  /** id */
  id: number
  /** Название проекта */
  name: string
  /** uuid Проекта из 1с */
  projectUuid: string
  portalUuid: string
  /** адрес */
  address: string
  /** особенности, набор строк */
  features: LotFeature[] | null
  /** квартал сдачи */
  buildingQuarter: number
  /** Локация */
  location: string | null
  /** год сдачи */
  buildingYear: number
  /** широта */
  lat: string
  /** долгота */
  lon: string
  /** сортровка */
  sort: number | null
  /** Дата создания */
  createdAt: string
  /** Дата обновления */
  updatedAt: string
  /** Расстояние до метро */
  metro: Metro[]
}

interface Metro {
  /** Цвет ветки */
  color: string
  /** Широта */
  lat: number
  /** Долгота */
  long: number
  /** Название станции */
  name: string
  /** Время до станции в минутах */
  timeTo: number
}

export interface LotPageData {
  /** Максимальная цена (общая) */
  maxPrice: string | null
  /** Минимальная цена (общая) */
  minPrice: string | null
  /** Максимальная цена за метр */
  maxMeterPrice: string | null
  /** Минимальная цена за метр */
  minMeterPrice: string | null
  /** Максимальная площадь */
  areaMin: string | null
  /** Минимальная площадь */
  areaMax: string | null
  /** Максимальный этаж */
  minFloor: number | null
  /** Минимальный этаж */
  maxFloor: number | null
  /** Максимальнок кол-во рабочих мест */
  minWorkPlacesCount: number | null
  /** Минимальнок кол-во рабочих мест */
  maxWorkPlacesCount: number | null
  /** Кол-во лотов */
  totalCount: number | null
  /** Метро */
  metro: string[]
  /** Готовость */
  years: number[]
  /** Задизейбленные кнопки */
  disableNoButton: {
    isCorner: boolean
    decoration: boolean
    isCatering: boolean
    waterPipes: boolean
  }
  /** Проекты подходящие под фильтр без учета поля selected */
  correspondingProjects: string[]
  /** Проекты */
  projects: string[]
  /** Башни/корпуса */
  house: string[]
  /** Особенности */
  features: string[]
  /** Угловое */
  isCorner: boolean
  /** Под общепит */
  isCatering: boolean
  /** Отделка */
  decoration: boolean
  /** Мокрая точка */
  waterPipes: boolean
  /** Дополнительные особенности */
  businessType: string[] | number[] | null
  /** Типы */
  types: string[]
}

export type RoomType = { [key: string]: string | number }

export type BusinessTypes = { [key: string]: number }
