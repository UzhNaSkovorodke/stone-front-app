import { withStyles } from '@bruitt/classnames'
import { ReactNode } from 'react'
import styles from './Option.module.scss'

const sx = withStyles(styles)

import {
  BaseOption,
  LabelAndValueNames,
  OnClickOption,
  RenderOptionProps,
  SelectSize,
} from '../types'
import { Icon } from '../../Icon'
import { Flex } from '../../Flex'
import { SelectProps } from '../Select'

export interface OptionListItem<T> extends LabelAndValueNames<BaseOption<T>> {
  option: BaseOption<T>
  isSelected: boolean
  index: number
  onClickOption: OnClickOption<T>
  renderOption?: (props: RenderOptionProps<T>) => ReactNode
  s: SelectSize
  variant: SelectProps<T>['variant']
}

export const Option = <T,>(props: OptionListItem<T>) => {
  const { option, onClickOption, labelName, isSelected, renderOption, index, s, variant } = props

  if (renderOption) {
    return <>{renderOption({ option, isSelected, onClickOption, index })}</>
  }

  return (
    <Flex
      onClick={() => onClickOption(option)}
      className={sx(styles.option, {
        isSelected,
        s,
        variant,
        disabled: option.disabled,
      })}
      data-option-focus="on"
      data-option-index={index}
      jc="space-between">
      <div>{option?.[labelName] as string}</div>
      {isSelected && (
        <Icon s={s === 'medium' ? '20' : '24'} color="secondary-green" name="check2" />
      )}
    </Flex>
  )
}
