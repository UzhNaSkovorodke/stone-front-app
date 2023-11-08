import { Lot } from './lots'

export interface LotCardData {
  id: number | null
  lotUuid: string | null
  projectUuid: string | null

  azimuthAngle: number | null
  sellingPrice: string | null
  sellingPricePerMeter: string | null
  rentPricePerMeterPerYear: string | null
  rentPricePerMonth: string | null
  discountedPrice: string | null
  discountVolume: string | null
  handoverKeys: string | null
  availableFrom: string | null
  entrance: string | null
  status: number | null
  rentStatus: number | null
  number: string | null
  address: string | null
  type: number | null
  direction: number | null
  doorNumber: string | null
  area: string | null
  kitchenArea: string | null
  livingArea: string | null
  floorsNumber: number | null
  floor: number | null
  saleFloorMin: number | null
  saleFloorMax: number | null
  ceiling: string | null
  roomsCount: number | null
  bedroomsCount: number | null
  windowView: string | null
  showcaseWindows: string | null
  promo: LotCardPromo[] | null
  housing: string | null
  section: string | null
  buildStage: number | null
  waterPipesCount: number | null
  combinedWcsCount: string | null
  workPlacesCount: number | null
  decoration: string | null
  isCorner: boolean | null
  waterPipes: boolean | null
  isCatering: boolean | null
  isDetachedBuilding: boolean | null
  isPhone: boolean | null
  isMortgage: boolean | null
  isGarbageTube: boolean | null
  isPenthouse: boolean | null
  isApart: boolean | null
  isDoubleLevel: boolean | null
  isRamp: boolean | null
  isCloseToLift: boolean | null
  isOccupied: boolean | null
  isGab: boolean | null
  isFacing: boolean | null
  liftPassenger: number | null
  liftService: number | null
  balcony: number | null
  loggia: number | null
  inputType: string | null
  condition: string | null
  layout: string | null
  repairType: string | null
  speciality: string | null
  features: LotCardFeature[] | null
  interiorPlanImg: string | null
  floorPlanImg: string | null
  project: LotCardProject
  parking: Lot[] | null
  recommended: Lot[] | null
  additionFeatures:
    | {
        val: string
        slug: string
        icoImg: string
        category: string
        filterable: boolean
      }[]
    | null
}

export interface LotCardProject {
  id: number
  salesOffice: {
    address: string
    metro: LotCardMetro[]
  }
  project: string
  name: string
  geo: LotCardGeo
  metro: LotCardMetro[]
  address: string
  features: LotCardFeature[]
  direction: number
  buildingYear: number
  logoImg: string
  sitPlanImg: string
  shortDesc: string
  sort: number
  strapiSlug: string
  createdAt: string
  updatedAt: string
}

export interface LotCardPromo {
  val: string
  slug: string
  category: string
  icoImg: string
  color: string
}

export interface LotCardFeature {
  val: string
  category: string
  icoImg:
    | {
        attributes: {
          url: string
        }
      }
    | string
  slug: string
}

export interface LotCardGeo {
  lat: number
  long: number
}

export interface LotCardMetro {
  timeTo: number
  name: string
  color: string
  station: string
}
