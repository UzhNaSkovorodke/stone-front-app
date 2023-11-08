import { IFilterFormValues } from 'src/features/commercialPage/Filter/filterForm.interface'

export default class LotsValue {
  lotsValue?: IFilterFormValues | null
  defaultQueryString: string
  defaultInitialValues?: IFilterFormValues | null

  constructor() {
    this.lotsValue = {
      minPrice: '',
      maxPrice: '',
      areaMin: '',
      areaMax: '',
      selected: [],
      type: [],
      locations: [],
      years: [],
      house: [],
    }

    this.defaultInitialValues = {
      minPrice: '',
      maxPrice: '',
      areaMin: '',
      areaMax: '',
      selected: [],
      type: [],
      locations: [],
      years: [],
      house: [],
    }

    this.defaultQueryString = ''
  }

  setDefaultLotValue(
    lotsValue: IFilterFormValues | null,
    defaultQueryString: string,
    defaultInitialValues: IFilterFormValues | null
  ) {
    this.lotsValue = lotsValue
    this.defaultQueryString = defaultQueryString
    this.defaultInitialValues = defaultInitialValues
  }
}
