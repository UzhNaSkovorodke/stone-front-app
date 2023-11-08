export interface ILot {
  direction: number
  address: string
  area: string
  availableFrom: string
  balcony: number
  bedroomsCount: number
  buildStage: number
  ceiling: string
  combinedWcsCount: number
  condition: string
  decoration: string
  directions: string
  discountVolume: string
  discountedPrice: string
  doorNumber: string
  entrance: string
  features: string
  floor: number
  floorPlanImg: string
  floorsNumber: number
  handoverKeys: string
  housing: string
  id: number
  input_type: string
  interiorPlanImg: null
  isApart: boolean
  isCatering: boolean
  isCloseToLift: boolean
  isCorner: boolean
  isDetachedBuilding: boolean
  isDoubleLevel: boolean
  isFacing: boolean
  isGab: boolean
  isGarbageTube: boolean
  isMortgage: boolean
  isOccupied: boolean
  isPenthouse: boolean
  isPhone: boolean
  isRamp: boolean
  kitchenArea: string
  layout: string
  liftPassenger: number
  liftDervice: number
  livingArea: string
  loggia: number
  lotUuid: string
  number: string
  project: {
    address: string
    buildingYear: number
    createdAt: string
    direction: number
    features: any
    geo: any
    id: number
    logoImg: string
    metro: any
    name: string
    project: string
    shortDesc: string
    sitPlanImg: string
    sort: number
    updatedAt: string
    buildingQuarter: number
    projectUuid: string
    portalUuid: string
    location: string
    lat: string
    lon: string
  }
  projectUuid: string
  promoText: string
  promo:
    | {
        val: string
        slug: string
        category: string
        icoImg: string
        color: string
      }[]
    | null
  propertyType: null
  rentPricePerMeterPerYear: string
  rentPricePerMonth: string
  rentStatus: number
  repairType: null
  roomsCount: number
  saleFloorMax: number
  saleFloorMin: number
  section: string
  sellingPrice: string
  sellingPricePerMeter: string
  showcaseWindows: null
  sitPlanImg: null
  speciality: null
  status: number
  typeName: number
  type: number | null
  waterPipesCount: number
  windowView: string
  workPlacesCount: number
  azimuthAngle: number
}
export interface ISections {
  lot: ILot
}

export interface IFavorites extends ISections {
  id: number
  userId: number
  lotId: number
  createdAt: string
  deletedAt: string
  viewedAt: string | null
  createdBy: number
  updatedAt: string
}

export interface ISelections extends ISections {
  createdAt: string
  createdBy: number
  id: number
  lotId: number
  updatedAt: string
  userId: number
  viewedAt: null
}

export interface IMeetings extends ISections {
  startDt: string
  viewedAt: string
  address: string
  createdAt: string
  id: number
  updatedAt: string
  status: string | number
}

export interface IReservations extends ISections {
  createdAt: string
  createdBy: number
  id: number
  lotId: number
  reservedDt: string
  updatedAt: string
  userId: number
  validTill: string
}

export type SectionsType =
  | IReservations[]
  | IFavorites[]
  | ISelections[]
  | IMeetings[]
  | ISections[]
