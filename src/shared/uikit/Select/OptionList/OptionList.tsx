import { withStyles } from '@bruitt/classnames'
import { ReactNode } from 'react'

import styles from './OptionList.module.scss'

import { Option } from '../Option'
import {
  BaseOption,
  LabelAndValueNames,
  OnClickOption,
  RenderOptionProps,
  SelectSize,
} from '../types'
import { SelectProps } from '../Select'

export interface OptionListProps<T> extends LabelAndValueNames<T> {
  options: Array<BaseOption<T>>
  onClickOption: OnClickOption<T>
  isShowNoResult: boolean
  isLoading: boolean
  selectedOption?: BaseOption<T>
  renderOption?: (props: RenderOptionProps<T>) => ReactNode
  s: SelectSize
  variant: SelectProps<T>['variant']
}

const sx = withStyles(styles)

export const OptionList = <T,>(props: OptionListProps<T>) => {
  const {
    options,
    labelName,
    valueName,
    onClickOption,
    selectedOption,
    isLoading,
    renderOption,
    s,
    variant,
  } = props

  if (isLoading) {
    return <div className={styles.service}>Loading...</div>
  }

  return (
    <div className={sx(styles.root, { s })}>
      {options.map((option, i) => (
        <Option<T>
          key={i}
          index={i}
          option={option}
          isSelected={isSelected(selectedOption, option, valueName)}
          onClickOption={onClickOption}
          valueName={valueName}
          labelName={labelName}
          renderOption={renderOption}
          s={s}
          variant={variant}
        />
      ))}
    </div>
  )
}

const isSelected = (
  selectedOption: BaseOption<any> | BaseOption<any>[],
  option: BaseOption<any>,
  valueName: string | number | symbol
) => {
  if (!Array.isArray(selectedOption)) return selectedOption?.[valueName] === option?.[valueName]

  return selectedOption.findIndex((item) => item[valueName] === option[valueName]) > -1
}
