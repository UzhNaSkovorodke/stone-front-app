export interface InitialInputsState {
  isPriceChanged: boolean
  isAreaChanged: boolean
  isProjectChanged: boolean
  isLocationChanged: boolean
  isHouseChanged: boolean
  isYearChanged: boolean
  isFloorChanged: boolean
  isWorkSpaceChanged: boolean
}

export const DEFAULT_INPUTS_STATE = {
    isPriceChanged: false,
    isAreaChanged: false,
    isProjectChanged: false,
    isLocationChanged: false,
    isHouseChanged: false,
    isYearChanged: false,
    isFloorChanged: false,
    isWorkSpaceChanged: false,
  }
