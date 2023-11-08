import React, { forwardRef } from 'react'

import { InputWrapper, InputWrapperProps } from '../InputWrapper'

type BaseInputProps = JSX.IntrinsicElements['input']

export interface InputProps
  extends BaseInputProps,
    Omit<InputWrapperProps, 'name' | 'onClick' | 'placeholder'> {
  placeholder?: InputWrapperProps['placeholder']
  name?: InputWrapperProps['name']
  onClick?: InputWrapperProps['onClick']
  wrapperClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    isError,
    variant,
    autoComplete,
    type = 'text',
    placeholder,
    pre,
    post,
    disabled,
    onClick,
    s,
    s_s,
    s_m,
    s_l,
    isSelect,
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
      placeholder={placeholder}
      name={rest.name}
      onClick={onClick}
      isSelect={isSelect}
      className={wrapperClassName}>
      <input
        ref={ref}
        type={type}
        autoComplete={autoComplete}
        disabled={disabled}
        data-testid={`field-${rest.name}`}
        id={rest.name}
        style={isSelect ? { cursor: 'pointer' } : {}}
        placeholder={placeholder}
        {...rest}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value.replace(/\s/g, '').length === 0) {
            e.target.value = ''
          }

          rest.onInput?.(e)
        }}
      />
    </InputWrapper>
  )
})

Input.displayName = 'Input'
