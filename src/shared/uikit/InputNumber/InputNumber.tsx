import { forwardRef } from 'react'
import { NumberFormatValues, NumericFormat, NumericFormatProps } from 'react-number-format'
import { InputWrapper, InputWrapperProps } from '../InputWrapper'

// TODO Fix types
// @ts-ignore
export interface InputNumberProps
  extends InputWrapperProps,
    Omit<NumericFormatProps, 'onClick' | 'size'> {
  integerScale?: number
  wrapperClassName?: string
}

const checkIntegerScale = (value: number | undefined) => {
  if (!value) return undefined

  return ({ floatValue }: NumberFormatValues) =>
    (typeof floatValue === 'number' && floatValue <= 10 ** value - 1) || floatValue === undefined
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
  const {
    pre,
    post,
    variant,
    isError,
    disabled,
    onClick,
    decimalScale = 0,
    integerScale,
    thousandSeparator = ' ',
    s,
    s_s,
    s_m,
    s_l,
    allowNegative = false,
    wrapperClassName,
    ...rest
  } = props

  return (
    <InputWrapper
      pre={pre}
      post={post}
      s={s}
      s_s={s_s}
      s_m={s_m}
      s_l={s_l}
      variant={variant}
      isError={isError}
      disabled={disabled}
      onClick={onClick}
      ref={ref}
      className={wrapperClassName}>
      {/* @ts-ignore */}
      <NumericFormat
        allowedDecimalSeparators={['.', ',', 'ю', 'б']}
        allowNegative={allowNegative}
        decimalScale={decimalScale}
        disabled={disabled}
        inputMode="numeric"
        isAllowed={checkIntegerScale(integerScale)}
        thousandSeparator={thousandSeparator}
        {...rest}
      />
    </InputWrapper>
  )
})

InputNumber.displayName = 'InputNumber'
