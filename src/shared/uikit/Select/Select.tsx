import { withStyles } from '@bruitt/classnames'
import { HTMLProps, ReactElement, ReactNode, Ref, forwardRef } from 'react'

import { InputWrapperProps } from '../InputWrapper'
import { Icon } from '../Icon'
import { Input } from '../Input'

import { OptionList } from './OptionList'
import { OptionListWrapper } from './OptionListWrapper'
import styles from './Select.module.scss'
import {
  BaseOption,
  LabelAndValueNames,
  LoadOptions,
  OnChange,
  RenderOptionProps,
  SelectSize,
} from './types'
import { useSelect } from './useSelect'

const sx = withStyles(styles)

export const SELECT_VARIANTS = {
  blackStroke: 'Black Stroke',
  blackFill: 'Black Fill',
  whiteStroke: 'White Stroke',
  whiteFill: 'White Fill',
}
export type SelectVariant = keyof typeof SELECT_VARIANTS

export interface SelectProps<T>
  extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'value' | 'size' | 'onClick'>,
    Partial<LabelAndValueNames<BaseOption<T>>> {
  value: T | T[]
  isMulti?: boolean
  multiDisplayInputValue?: string
  loadOptions?: LoadOptions<T>
  options?: T[]
  minCharForSearch?: number
  isError?: InputWrapperProps['isError']
  variant?: SelectVariant
  pre?: InputWrapperProps['pre']
  onChange?: OnChange<T>
  disabled?: boolean
  s?: SelectSize
  s_s?: SelectSize
  s_m?: SelectSize
  s_l?: SelectSize
  renderOption?: (props: RenderOptionProps<T>) => ReactNode
}

const SelectComponent = <T extends Array<BaseOption<T>>>(
  props: SelectProps<T>,
  ref: Ref<HTMLInputElement>
) => {
  const {
    labelName = 'label',
    valueName = 'value',
    s = 'medium',
    s_s,
    s_m,
    s_l,
    variant = 'blackFill',
    minCharForSearch = 2,
    options: propsOptions = [],
    value: valueProps,
    disabled,
    onChange,
    onBlur,
    loadOptions,
    renderOption,
    isError,
    isMulti = false,
    multiDisplayInputValue,
    className,
    ...rest
  } = props

  const {
    flags: { isOptionsOpened, isShowNoResult, isLoading },
    actions: { onClickInput, onInputBlur, onInputChange, onClickOption, onKeyDown },
    data: { inputValue, options, selectedOption, optionsWrapperRef },
  } = useSelect<T>({
    minCharForSearch,
    labelName,
    valueName,
    loadOptions,
    onChange,
    valueProps,
    propsOptions,
    onBlur,
    disabled,
    isMulti,
    multiDisplayInputValue,
  })

  return (
    <div className={sx(styles.root, className)} onKeyDown={onKeyDown}>
      <Input
        post={<Icon s="20" name={isOptionsOpened ? 'directionUp' : 'directionDown'} />}
        {...rest}
        disabled={disabled}
        ref={ref}
        isError={isError}
        readOnly
        onChange={onInputChange}
        onBlur={onInputBlur}
        onClick={onClickInput}
        autoComplete="off"
        autoCapitalize="none"
        spellCheck="false"
        wrapperClassName={sx(styles.input, {
          isOptionsOpened,
          isOptionSelected: Boolean(inputValue),
          variant,
          disabled,
          isError,
        })}
        value={inputValue}
        s={s}
        isSelect={true}
        s_s={s_s}
        s_m={s_m}
        s_l={s_l}
        variant={variant}
      />
      {isOptionsOpened && (
        <OptionListWrapper ref={optionsWrapperRef} variant={variant}>
          <OptionList<T>
            options={options}
            labelName={labelName}
            valueName={valueName}
            onClickOption={onClickOption}
            selectedOption={selectedOption}
            isShowNoResult={isShowNoResult}
            isLoading={isLoading}
            renderOption={renderOption}
            s={s}
            variant={variant}
          />
        </OptionListWrapper>
      )}
    </div>
  )
}

export const Select = forwardRef(SelectComponent) as <T>(
  props: SelectProps<T> & { ref?: Ref<HTMLInputElement> }
) => ReactElement
