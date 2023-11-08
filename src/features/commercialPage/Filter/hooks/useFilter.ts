import { IFilterFormValues } from '../filterForm.interface'
import { Option } from 'src/features/catalogOffice/types/FilterFormValues'
import { isValid, setNotValidQueryString, setValidStringQuery } from '../inputValidation'
import { Dispatch, SetStateAction, ChangeEvent } from 'react'

interface UseFilterProps {
  filterValues: IFilterFormValues
  defaultInitialValues: IFilterFormValues
  isAreaChanged: boolean
  isPriceChanged: boolean
  filterQueryString: string
  setFilterQueryString: Dispatch<SetStateAction<string>>
  setFilterValues: Dispatch<SetStateAction<IFilterFormValues>>
  setIsSelectChange: Dispatch<SetStateAction<boolean>>
}

export const useFilter = ({
  filterValues,
  defaultInitialValues,
  isAreaChanged,
  isPriceChanged,
  setFilterQueryString,
  setFilterValues,
  setIsSelectChange,
}: UseFilterProps) => {
  const changeFilterValues =
    (field: keyof IFilterFormValues) =>
    (event: ChangeEvent<HTMLInputElement> | Option | Option[] | null): void => {
      let value: string | string[] | Option | Option[] | ChangeEvent<HTMLInputElement> | null
      const isPrice: boolean =
        field === 'minPrice' || field === 'maxPrice' || field === 'areaMin' || field === 'areaMax'

      value = event

      if (event && 'target' in event) {
        value = event.target.value

        //Обработка поля type
        if (field === 'type' && event && 'target' in event) {
          const values = filterValues[field]

          if (values.includes(event.target.value) && values.length === 1) {
            value = values
          } else {
            value = values.includes(event.target.value)
              ? values.filter((val: string) => val !== event.target.value)
              : [...values, event.target.value]
          }

          setFilterQueryString(
            `filter[direction]=1&filter[type]=${value
              .sort()
              .map((item: string) => item)
              .join(',')}`
          )
          setFilterValues({ ...filterValues })
        }
      }

      //Обработка поля selected
      if (field === 'selected') {
        const defaultQueryString = `filter[direction]=1&filter[type]=${filterValues.type
          .sort()
          .map((item) => item)
          .join(',')}${
          isPriceChanged ? `&filter[price]=${filterValues.minPrice},${filterValues.maxPrice}` : ''
        }`

        if (value !== null && field !== null && (value as Option[]).length > 0) {
          setFilterQueryString(
            defaultQueryString +
              `${
                isAreaChanged ? `&filter[area]=${filterValues.areaMin},${filterValues.areaMax}` : ''
              }&filter[selected]=${(value as Option[]).map((i: any) => i.value).join(',')}`
          )

          const newFilterValues: IFilterFormValues = {
            ...filterValues,
            [field as string]: value,
          }
          setFilterValues(newFilterValues)

          setIsSelectChange(true)
        } else {
          setFilterQueryString(defaultQueryString)
          const newFilterValues: IFilterFormValues = {
            ...filterValues,
            [field as string]: [],
          }
          setFilterValues(newFilterValues)
        }
      }

      //Обработка полей с м2 и  ценой
      if (isPrice) {
        const isValidValue: boolean = isValid(field, value as string, defaultInitialValues)

        if (isValidValue) {
          setValidStringQuery({
            filterValues,
            field,
            value,
            isPriceChanged,
            setFilterQueryString,
          })
        } else {
          setNotValidQueryString({
            value,
            field,
            isPriceChanged,
            defaultInitialValues,
            filterValues,
            setFilterValues,
            setFilterQueryString,
          })
        }
      }
    }

  return {
    flags: {},
    data: {},
    actions: {
      changeFilterValues,
    },
  }
}
