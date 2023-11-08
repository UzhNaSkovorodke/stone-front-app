import { FilterFormValues, Option } from 'src/features/catalogOffice/types/FilterFormValues'
import { parseFilterToQuery } from '../lib/parseFilterToQuery'
import { isValid } from 'src/features/commercialPage/Filter/inputValidation'
import { Dispatch, SetStateAction, ChangeEvent } from 'react'
import { InitialInputsState } from '../types/DefaultStates'
import { DefaultOptions } from '../types/DefaultOptions'

interface UseCatalogFilterProps {
  filterValues: FilterFormValues
  filterQueryString: string
  options: DefaultOptions
  isFeatures: string[]
  defaultInitialValues: FilterFormValues
  setIsFeatures: Dispatch<SetStateAction<string[]>>
  setFilterQueryString: Dispatch<SetStateAction<string>>
  setFilterValues: Dispatch<SetStateAction<FilterFormValues>>
  inputsState: InitialInputsState
  setInputsState: Dispatch<SetStateAction<InitialInputsState>>
}

export const useFilter = ({
  filterValues,
  options,
  isFeatures,
  defaultInitialValues,
  inputsState,
  setIsFeatures,
  setFilterQueryString,
  setFilterValues,
  setInputsState,
}: UseCatalogFilterProps) => {
  const newQueryString = (
    filterValues: FilterFormValues,
    features?: string[] | null,
    changedField?: string
  ) => {
    const query = parseFilterToQuery(
      { ...filterValues } as any,
      features as string[],
      (inputsState.isPriceChanged =
        changedField === 'minPrice' ||
        changedField === 'maxPrice' ||
        changedField === 'minMeterPrice' ||
        changedField === 'maxMeterPrice'
          ? true
          : inputsState.isPriceChanged),
      (inputsState.isAreaChanged =
        changedField === 'areaMin' || changedField === 'areaMax'
          ? true
          : inputsState.isAreaChanged),
      (inputsState.isProjectChanged =
        changedField === 'selected' ? true : inputsState.isProjectChanged),
      (inputsState.isLocationChanged =
        changedField === 'location' ? true : inputsState.isLocationChanged),
      (inputsState.isHouseChanged = changedField === 'house' ? true : inputsState.isHouseChanged),
      (inputsState.isYearChanged = changedField === 'years' ? true : inputsState.isYearChanged),
      (inputsState.isFloorChanged =
        changedField === 'minFloor' || changedField === 'maxFloor'
          ? true
          : inputsState.isFloorChanged),
      (inputsState.isWorkSpaceChanged =
        changedField === 'maxWorkPlacesCount' || changedField === 'minWorkPlacesCount'
          ? true
          : inputsState.isWorkSpaceChanged)
    )

    setFilterQueryString(query)
  }

  const changeFilterValues =
    (field: string) =>
    (event: ChangeEvent<HTMLInputElement> | Option | Option[] | null): void => {
      let value: string | string[] | Option | Option[] | ChangeEvent<HTMLInputElement> | null
      const isPrice: boolean =
        field === 'minPrice' ||
        field === 'maxPrice' ||
        field === 'areaMin' ||
        field === 'areaMax' ||
        field === 'maxMeterPrice' ||
        field === 'minMeterPrice'

      const isFloor: boolean = field === 'minFloor' || field === 'maxFloor'

      const isWorkPlacesCount: boolean =
        field === 'minWorkPlacesCount' || field === 'maxWorkPlacesCount'

      const isOptions: boolean =
        field === 'isCatering' ||
        field === 'isCorner' ||
        field === 'decoration' ||
        field === 'waterPipes'

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
          setFilterQueryString(`&filter[direction]=1&filter[type]=${value.sort().toString()}`)
          setFilterValues({ ...filterValues, [field]: value })
        }
      }
      if (field === 'selected') {
        setInputsState({ ...inputsState, isProjectChanged: true })
        if (value !== null && field !== null && (value as Option[]).length > 0) {
          newQueryString({ ...filterValues, [field as string]: value }, isFeatures, 'selected')
          const newFilterValues: FilterFormValues = {
            ...filterValues,
            [field as string]: value,
          }
          setFilterValues(newFilterValues)
        } else {
          newQueryString({ ...filterValues, [field as string]: value }, isFeatures, 'selected')
          const newFilterValues: FilterFormValues = {
            ...filterValues,
            [field as string]: [],
          }
          setFilterValues(newFilterValues)
        }
      }

      //Обработка поля тип цены
      if (field === 'priceType') {
        setFilterValues({ ...filterValues, [field as string]: value })
      }

      //Обработка поля локации
      if (field === 'locations') {
        setInputsState({ ...inputsState, isLocationChanged: true })
        if (value !== null && (value as Option[]).length > 0) {
          newQueryString({ ...filterValues, [field as string]: value }, isFeatures, 'location')
          setFilterValues({ ...filterValues, [field as string]: value })
        } else {
          newQueryString({ ...filterValues, [field as string]: value }, isFeatures, 'location')
          setFilterValues({
            ...filterValues,
            [field as string]: defaultInitialValues.locations,
          })
        }
      }

      //Обработка поля цена
      if (isPrice) {
        const isValidValue: boolean = isValid(field, value as string, defaultInitialValues)

        if (
          field === 'minPrice' ||
          field === 'maxPrice' ||
          field === 'maxMeterPrice' ||
          field === 'minMeterPrice'
        ) {
          setInputsState({ ...inputsState, isPriceChanged: true })
        } else if (field === 'areaMin' || field === 'areaMax') {
          setInputsState({ ...inputsState, isAreaChanged: true })
        }

        if (isValidValue) {
          newQueryString(
            {
              ...filterValues,
              [field as string]: value && (value as string).replaceAll(' ', ''),
            },
            isFeatures,
            field
          )
          setFilterValues({ ...filterValues, [field as string]: value })
        } else {
          for (const [key, value] of Object.entries(defaultInitialValues)) {
            if (key === field) {
              setFilterValues({ ...filterValues, [field as string]: value })
            }
          }
        }
      }

      //Обработка поля этаж
      if (isFloor) {
        setInputsState({ ...inputsState, isFloorChanged: true })
        newQueryString({ ...filterValues, [field as string]: value }, isFeatures, field)
        setFilterValues({ ...filterValues, [field as string]: value })
      }

      //Обработка поля количество рабочих мест
      if (isWorkPlacesCount) {
        setInputsState({ ...inputsState, isWorkSpaceChanged: true })
        newQueryString({ ...filterValues, [field as string]: value }, isFeatures, field)
        setFilterValues({ ...filterValues, [field as string]: value })
      }

      //Чекбоксы
      if (isOptions) {
        if (value === '1') {
          if ((filterValues as any)[`${field}`] === '1') {
            newQueryString({ ...filterValues, [field as string]: null })
            setFilterValues({ ...filterValues, [field as string]: null })
          } else {
            newQueryString({ ...filterValues, [field as string]: true })
            setFilterValues({ ...filterValues, [field as string]: value })
          }
        } else {
          if ((filterValues as any)[`${field}`] === '0') {
            newQueryString({ ...filterValues, [field as string]: null })
            setFilterValues({ ...filterValues, [field as string]: null })
          } else {
            newQueryString({ ...filterValues, [field as string]: false })
            setFilterValues({ ...filterValues, [field as string]: value })
          }
        }
      }

      //Поле особенности
      if (field === 'features') {
        if (isFeatures.includes(`${value}`)) {
          setIsFeatures(isFeatures.filter((f) => f !== value))
          isFeatures.length > 1
            ? newQueryString({ ...filterValues, [field as string]: isFeatures }, isFeatures)
            : newQueryString({
                ...filterValues,
                [field as string]: options.features.map((f: Option) => f.label).toString(),
              })
        } else {
          setIsFeatures([...isFeatures, `${value}`])
          newQueryString({ ...filterValues, [field as string]: [...isFeatures, `${value}`] }, [
            ...isFeatures,
            `${value}`,
          ])
        }
      }

      //Поля бизнес типы
      // if (field === 'businessType') {
      //   if (filterValues.businessType.includes(value)) {
      //     setFilterValues({
      //       ...filterValues,
      //       [field as string]: filterValues.businessType.filter((f: Option) => f !== value),
      //     })
      //   } else {
      //     setFilterValues({
      //       ...filterValues,
      //       [field as string]: [...filterValues.businessType, `${value}`],
      //     })
      //   }
      // }

      //Поле готовность
      if (field === 'years') {
        setInputsState({ ...inputsState, isYearChanged: true })

        if (value && (value as string[]).length > 0) {
          newQueryString(
            { ...filterValues, [field as string]: (value as Option[]).sort() },
            isFeatures,
            field
          )
          setFilterValues({ ...filterValues, [field as string]: value })
        } else {
          newQueryString({ ...filterValues, [field as string]: value }, isFeatures, field)
          setFilterValues({ ...filterValues, [field as string]: options.years })
        }
      }

      //Поле корпус
      if (field === 'house') {
        setInputsState({ ...inputsState, isHouseChanged: true })
        if (value && (value as string[]).length > 0) {
          newQueryString({ ...filterValues, [field as string]: value }, isFeatures, field)
          setFilterValues({ ...filterValues, [field as string]: value })
        } else {
          newQueryString({ ...filterValues, [field as string]: options.house }, isFeatures, field)
          setFilterValues({ ...filterValues, [field as string]: [] })
        }
      }
    }

  const inputValueChange = (e: ChangeEvent, field: string) => {
    setFilterValues({
      ...filterValues,
      [field]: (e.target as HTMLInputElement).value.replaceAll(' ', ''),
    })
  }

  return {
    flags: {},
    data: {},
    actions: {
      inputValueChange,
      changeFilterValues,
    },
  }
}
