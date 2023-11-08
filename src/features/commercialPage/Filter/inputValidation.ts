import { strToNum } from 'shared/utils/mapping'
import { IFilterFormValues } from './filterForm.interface'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Option } from 'src/features/catalogOffice/types/FilterFormValues'

interface ValidStringQuery {
  filterValues: IFilterFormValues
  field: string
  value: string | string[] | Option | Option[] | null | ChangeEvent<HTMLInputElement>
  isPriceChanged: boolean
  setFilterQueryString: Dispatch<SetStateAction<string>>
}

interface NotValidStringQuery {
  value: string | string[] | Option | Option[] | null | ChangeEvent<HTMLInputElement>
  field: string
  isPriceChanged: boolean
  defaultInitialValues: IFilterFormValues
  filterValues: IFilterFormValues
  setFilterValues: Dispatch<SetStateAction<IFilterFormValues>> | any
  setFilterQueryString: Dispatch<SetStateAction<string>>
}

//Валидация полей с м2 и ценами
export const isValid = (
  field: string,
  value: string,
  defaultInitialValues: IFilterFormValues
): boolean => {
  if (field === 'maxPrice') {
    if (strToNum(value) >= Math.floor(strToNum(defaultInitialValues.maxPrice))) return false
    if (strToNum(value) < Math.floor(strToNum(defaultInitialValues.minPrice))) return false
  }
  if (field === 'minPrice') {
    if (strToNum(value) <= Math.floor(strToNum(defaultInitialValues.minPrice))) return false
    if (strToNum(value) > Math.floor(strToNum(defaultInitialValues.maxPrice))) return false
  }
  if (field === 'areaMax') {
    if (strToNum(value) >= Math.floor(strToNum(defaultInitialValues.areaMax))) return false
    if (strToNum(value) < Math.floor(strToNum(defaultInitialValues.areaMin))) return false
  }
  if (field === 'areaMin') {
    if (strToNum(value) <= Math.floor(strToNum(defaultInitialValues.areaMin))) return false
    if (strToNum(value) > Math.floor(strToNum(defaultInitialValues.areaMax))) return false
  }
  if (field === 'minMeterPrice') {
    if (strToNum(value) <= Math.floor(strToNum(defaultInitialValues.minMeterPrice as string)))
      return false
    if (strToNum(value) > Math.floor(strToNum(defaultInitialValues.maxMeterPrice as string)))
      return false
  }
  if (field === 'maxMeterPrice') {
    if (strToNum(value) <= Math.floor(strToNum(defaultInitialValues.minMeterPrice as string)))
      return false
    if (strToNum(value) > Math.floor(strToNum(defaultInitialValues.maxMeterPrice as string)))
      return false
  }
  return true
}

export const setNotValidQueryString = ({
  value,
  field,
  isPriceChanged,
  defaultInitialValues,
  filterValues,
  setFilterValues,
  setFilterQueryString,
}: NotValidStringQuery): void => {
  const defaultQueryString = `filter[direction]=1&filter[type]=${filterValues.type
    .map((item) => item)
    .join(',')}${
    filterValues.selected.length > 0
      ? `&filter[selected]=${filterValues.selected.map((i) => i.value).join(',')}`
      : ''
  }`

  if (field === 'maxPrice') {
    strToNum(value as string) > strToNum(defaultInitialValues.maxPrice)
      ? (setFilterValues((prevValues: IFilterFormValues) => ({
          ...prevValues,
          ...{ ...filterValues, [field]: defaultInitialValues.maxPrice },
        })),
        setFilterQueryString(
          defaultQueryString +
            `&filter[price]=${filterValues.minPrice},${defaultInitialValues.maxPrice}`
        ))
      : strToNum(value as string) < strToNum(defaultInitialValues.minPrice)
      ? (setFilterValues((prevValues: IFilterFormValues) => ({
          ...prevValues,
          ...{ ...filterValues, [field]: defaultInitialValues.minPrice },
        })),
        setFilterQueryString(
          defaultQueryString +
            `&filter[price]=${filterValues.minPrice},${defaultInitialValues.minPrice}`
        ))
      : null
  }
  if (field === 'minPrice') {
    strToNum(value as string) < strToNum(defaultInitialValues.minPrice) && isPriceChanged
      ? (setFilterValues((prevValues: IFilterFormValues) => ({
          ...prevValues,
          ...{ ...filterValues, [field]: defaultInitialValues.minPrice },
        })),
        setFilterQueryString(
          defaultQueryString +
            `&filter[price]=${defaultInitialValues.minPrice},${filterValues.maxPrice}`
        ))
      : strToNum(value as string) < strToNum(defaultInitialValues.minPrice)
      ? (setFilterValues((prevValues: IFilterFormValues) => ({
          ...prevValues,
          ...{ ...filterValues, [field]: defaultInitialValues.minPrice },
        })),
        setFilterQueryString(
          defaultQueryString +
            `&filter[price]=${defaultInitialValues.minPrice},${filterValues.maxPrice}`
        ))
      : null
  }
  if (field === 'areaMax') {
    strToNum(value as string) > strToNum(defaultInitialValues.areaMax)
      ? (setFilterValues((prevValues: IFilterFormValues) => ({
          ...prevValues,
          ...{ ...filterValues, [field]: defaultInitialValues.areaMax },
        })),
        setFilterQueryString(
          defaultQueryString +
            `&filter[area]=${filterValues.areaMin},${defaultInitialValues.areaMax}`
        ))
      : strToNum(value as string) < strToNum(defaultInitialValues.areaMin)
      ? (setFilterValues((prevValues: IFilterFormValues) => ({
          ...prevValues,
          ...{ ...filterValues, [field]: defaultInitialValues.areaMin },
        })),
        setFilterQueryString(
          defaultQueryString +
            `&filter[area]=${filterValues.areaMin},${defaultInitialValues.areaMin}`
        ))
      : null
  }
  if (field === 'areaMin') {
    strToNum(value as string) < strToNum(defaultInitialValues.areaMin)
      ? (setFilterValues((prevValues: IFilterFormValues) => ({
          ...prevValues,
          ...{ ...filterValues, [field]: defaultInitialValues.areaMin },
        })),
        setFilterQueryString(
          defaultQueryString +
            `&filter[area]=${defaultInitialValues.areaMin},${filterValues.areaMax}`
        ))
      : strToNum(value as string) < strToNum(defaultInitialValues.areaMin)
      ? (setFilterValues((prevValues: IFilterFormValues) => ({
          ...prevValues,
          ...{ ...filterValues, [field]: defaultInitialValues.areaMin },
        })),
        setFilterQueryString(
          defaultQueryString +
            `&filter[area]=${defaultInitialValues.areaMin},${filterValues.areaMax}`
        ))
      : null
  }
  if (field === 'minMeterPrice') {
    strToNum(value as string) < strToNum(defaultInitialValues.minMeterPrice as string)
      ? (setFilterValues((prevValues: IFilterFormValues) => ({
          ...prevValues,
          ...{ ...filterValues, [field]: defaultInitialValues.minMeterPrice },
        })),
        setFilterQueryString(
          defaultQueryString +
            `&filter[meter_price]=${defaultInitialValues.minMeterPrice?.replaceAll(' ', '')},${
              filterValues.maxMeterPrice
            }`
        ))
      : strToNum(value as string) < strToNum(defaultInitialValues.minMeterPrice as string)
      ? (setFilterValues((prevValues: IFilterFormValues) => ({
          ...prevValues,
          ...{ ...filterValues, [field]: defaultInitialValues.areaMin },
        })),
        setFilterQueryString(
          defaultQueryString +
            `&filter[meter_price]=${defaultInitialValues.minMeterPrice?.replaceAll(' ', '')},${
              filterValues.maxMeterPrice
            }`
        ))
      : null
  }
  if (field === 'maxMeterPrice') {
    strToNum(value as string) < strToNum(defaultInitialValues.maxMeterPrice as string)
      ? (setFilterValues((prevValues: IFilterFormValues) => ({
          ...prevValues,
          ...{ ...filterValues, [field]: defaultInitialValues.minMeterPrice },
        })),
        setFilterQueryString(
          defaultQueryString +
            `&filter[meter_price]=${filterValues.minMeterPrice},${defaultInitialValues.maxMeterPrice}`
        ))
      : strToNum(value as string) < strToNum(defaultInitialValues.minMeterPrice as string)
      ? (setFilterValues((prevValues: IFilterFormValues) => ({
          ...prevValues,
          ...{ ...filterValues, [field]: defaultInitialValues.areaMin },
        })),
        setFilterQueryString(
          defaultQueryString +
            `&filter[meter_price]=${filterValues.minMeterPrice},${defaultInitialValues.maxMeterPrice}`
        ))
      : null
  }
}

export const setValidStringQuery = ({
  filterValues,
  field,
  value,
  isPriceChanged,
  setFilterQueryString,
}: ValidStringQuery): void => {
  const defaultQueryString = `filter[direction]=1&filter[type]=${filterValues.type
    .map((item) => item)
    .join(',')}${
    filterValues.selected.length > 0
      ? `&filter[selected]=${filterValues.selected.map((i) => i.value).join(',')}`
      : ''
  }`

  if (field === 'maxPrice') {
    setFilterQueryString(
      defaultQueryString +
        `&filter[price]=${filterValues.minPrice},${(value as string).replaceAll(' ', '')}`
    )
  }
  if (field === 'minPrice') {
    setFilterQueryString(
      defaultQueryString +
        `&filter[price]=${(value as string).replaceAll(' ', '')},${filterValues.maxPrice}`
    )
  }
  if (field === 'areaMin') {
    setFilterQueryString(
      defaultQueryString +
        `${
          isPriceChanged ? `&filter[price]=${filterValues.minPrice},${filterValues.maxPrice}` : ''
        }&filter[area]=${(value as string).replaceAll(' ', '')},${filterValues.areaMax}`
    )
  }
  if (field === 'areaMax') {
    setFilterQueryString(
      defaultQueryString +
        `${
          isPriceChanged ? `&filter[price]=${filterValues.minPrice},${filterValues.maxPrice}` : ''
        }&filter[area]=${filterValues.areaMin},${(value as string).replaceAll(' ', '')}`
    )
  }
  if (field === 'minMeterPrice') {
    setFilterQueryString(
      defaultQueryString +
        `${
          isPriceChanged ? `&filter[price]=${filterValues.minPrice},${filterValues.maxPrice}` : ''
        }&filter[meter_price]=${(value as string).replaceAll(' ', '')},${
          filterValues.maxMeterPrice
        }`
    )
  }
  if (field === 'maxMeterPrice') {
    setFilterQueryString(
      defaultQueryString +
        `${
          isPriceChanged ? `&filter[price]=${filterValues.minPrice},${filterValues.maxPrice}` : ''
        }&filter[meter_price]=${filterValues.minMeterPrice},${(value as string).replaceAll(
          ' ',
          ''
        )}`
    )
  }
}
