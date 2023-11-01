import { withStyles } from '@bruitt/classnames'
import { ButtonBase, ButtonBaseProps } from '../ButtonBase'

import s from './IconButton.module.scss'
import { Icon, IconName } from '../Icon'
import { Size } from '../../types/icons'
import { forwardRef } from 'react'
import { Loader } from '../Loader'

const sx = withStyles(s)

export const ICON_BUTTON_VARIANTS = {
  blackStroke: 'Black Stroke',
  blackFill: 'Black Fill',
  whiteStroke: 'White Stroke',
  whiteFill: 'White Fill',
  grayStroke: 'Gray Stroke',
  grayStrokeSmall: 'Gray Stroke Small',
}

export type IconButtonVariant = keyof typeof ICON_BUTTON_VARIANTS

type IconButtonSize = 's' | 'm' | 'l'

interface IconButtonProps extends ButtonBaseProps {
  variant?: IconButtonVariant
  isLoading?: boolean
  icon: IconName
  disabled?: boolean
  s?: IconButtonSize
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'blackStroke',
      isLoading = false,
      icon,
      disabled = false,
      s = 'l',
      ...rest
    }: IconButtonProps,
    ref
  ) => {
    return (
      <ButtonBase
        className={sx('button', className, { variant, disabled, s, isLoading })}
        disabled={disabled}
        {...rest}
        ref={ref}>
        <Icon name={icon} s={ICON_SIZES[s]} className={sx('icon')} />

        <Loader.Overlay isActive={isLoading}>
          <Loader className={sx('loaderIcon')} s={ICON_SIZES[s]} />
        </Loader.Overlay>
      </ButtonBase>
    )
  }
)

const ICON_SIZES: { [key in IconButtonSize]: Size } = {
  s: '16',
  m: '20',
  l: '24',
}

IconButton.displayName = 'IconButton'
