import { withStyles } from '@bruitt/classnames'
import { ButtonBase, ButtonBaseProps } from '../ButtonBase'
import { forwardRef, ReactNode } from 'react'
import { Loader } from '../Loader'

import style from './Button.module.scss'

const sx = withStyles(style)

export const BUTTON_VARIANTS = {
  blackStroke: 'Black Stroke',
  blackStroke2: 'Black Stroke 2',
  blackFill: 'Black Fill',
  whiteStroke: 'White Stroke',
  whiteStroke2: 'White Stroke 2',
  whiteFill: 'White Fill',
  domStroke: 'Dom Stroke',
  domStroke2: 'Dom Stroke 2',
  domFill: 'Dom Fill',
  officeStroke: 'Office Stroke',
  officeStroke2: 'Office Stroke 2',
  officeFill: 'Office Fill',
  redFill: 'Red Fill',
}

export type ButtonVariant = keyof typeof BUTTON_VARIANTS
type ButtonSizes = 'small' | 'medium' | 'large'
type ButtonWidth = 'auto' | 'full'

interface ButtonProps extends ButtonBaseProps {
  variant?: ButtonVariant
  isLoading?: boolean
  s?: ButtonSizes
  s_s?: ButtonSizes
  s_m?: ButtonSizes
  s_l?: ButtonSizes
  width?: ButtonWidth
  width_s?: ButtonWidth
  width_m?: ButtonWidth
  width_l?: ButtonWidth
  pre?: ReactNode
  post?: ReactNode
  disabled?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      isLoading = false,
      variant = 'blackStroke',
      s = 'large',
      s_s,
      s_m,
      s_l,
      width = 'auto',
      width_s,
      width_m,
      width_l,
      pre,
      post,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    return (
      <ButtonBase
        className={sx('button', className, {
          s,
          s_s,
          s_m,
          s_l,
          width_s,
          width_m,
          width_l,
          variant,
          width,
          disabled,
          isPre: Boolean(pre),
          isPost: Boolean(post),
          isLoading,
        })}
        {...rest}
        disabled={disabled}
        ref={ref}>
        <span className={sx('content')}>
          {pre && <span className={sx('enhancer')}>{pre}</span>}
          {children}
          {post && <span className={sx('enhancer')}>{post}</span>}
        </span>

        <Loader.Overlay isActive={isLoading}>
          <Loader className={style.loaderIcon} />
        </Loader.Overlay>
      </ButtonBase>
    )
  }
)

Button.displayName = 'Button'
