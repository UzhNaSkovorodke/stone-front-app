import { withStyles } from '@bruitt/classnames'
import { ButtonBase, ButtonBaseProps } from '../ButtonBase'

import s from './IconButton.module.scss'
import { Icon, IconName } from '../Icon'
import { Size } from '../../types/icons'
import { ForwardedRef, forwardRef } from 'react'
import { Loader } from '../Loader'
import { LinkBase, LinkBaseProps } from '../LinkBased'

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

type IconButtonProps = {
  href?: string
} & (ButtonBaseProps | LinkBaseProps) & {
    variant?: IconButtonVariant
    isLoading?: boolean
    icon: IconName
    disabled?: boolean
    s?: IconButtonSize
  }

export const IconButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>(
  (
    {
      className,
      variant = 'blackStroke',
      isLoading = false,
      icon,
      disabled = false,
      s = 'l',
      href,
      ...rest
    }: IconButtonProps,
    ref
  ) => {
    if (href) {
      const refElement = ref as ForwardedRef<HTMLAnchorElement>
      return (
        <LinkBase
          className={sx('button', className, { variant, disabled, s, isLoading })}
          {...(rest as LinkBaseProps)}
          ref={refElement}
          href={href}>
          <Icon name={icon} s={ICON_SIZES[s]} className={sx('icon')} />

          <Loader.Overlay isActive={isLoading}>
            <Loader className={sx('loaderIcon')} s={ICON_SIZES[s]} />
          </Loader.Overlay>
        </LinkBase>
      )
    } else {
      const refElement = ref as ForwardedRef<HTMLButtonElement>
      return (
        <ButtonBase
          className={sx('button', className, { variant, disabled, s, isLoading })}
          disabled={disabled}
          {...(rest as ButtonBaseProps)}
          ref={refElement}>
          <Icon name={icon} s={ICON_SIZES[s]} className={sx('icon')} />

          <Loader.Overlay isActive={isLoading}>
            <Loader className={sx('loaderIcon')} s={ICON_SIZES[s]} />
          </Loader.Overlay>
        </ButtonBase>
      )
    }
  }
)

const ICON_SIZES: { [key in IconButtonSize]: Size } = {
  s: '16',
  m: '20',
  l: '24',
}

IconButton.displayName = 'IconButton'
