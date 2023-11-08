import { withStyles } from '@bruitt/classnames'
import React, { forwardRef, ReactNode } from 'react'

import { BaseModal, BaseModalProps } from '../BaseModal'

import s from './FullscreenModal.module.scss'

const sx = withStyles(s)

export interface FullscreenModalProps extends BaseModalProps {
  className?: string
  header?: ReactNode
  footer?: ReactNode
}

const TRANSITION_TIME = 200

export const FullscreenModal = forwardRef<HTMLDivElement, FullscreenModalProps>((props, _ref) => {
  const {
    className,
    children,
    shouldCloseOnOverlayClick = true,
    header,
    footer,
    ...modalProps
  } = props

  return (
    <BaseModal
      closeTimeoutMS={TRANSITION_TIME}
      className={sx(s.root, className)}
      overlayClassName={sx(s.overlay)}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      overlayElement={(props, contentElement) => (
        <>
          <div {...props} />

          {contentElement}
        </>
      )}
      {...modalProps}>
      {header}
      <div className={sx(s.content)}>{children}</div>
      {footer && <div className={s.footer}>{footer}</div>}
    </BaseModal>
  )
})

FullscreenModal.displayName = 'FullscreenModal'
