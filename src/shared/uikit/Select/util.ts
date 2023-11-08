import { BaseOption, InputValue, LabelAndValueNames } from './types'

interface FilterOptionProps<T> {
  value: InputValue
  labelName: LabelAndValueNames<T>['labelName']
  propsOptions: Array<BaseOption<T>>
}

export const filterOption = <T>({ value, labelName, propsOptions }: FilterOptionProps<T>) => {
  const valueLowerCase = value.toLowerCase().replace(/\s/g, '')

  return propsOptions.filter((option) =>
    String(option?.[labelName]).toLowerCase().replace(/\s/g, '').includes(valueLowerCase)
  )
}
