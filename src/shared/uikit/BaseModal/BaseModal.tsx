import { withStyles } from '@bruitt/classnames'
import React, { useCallback } from 'react'
import ReactModal from 'react-modal'
import { useBlockScrollIf } from '../../hooks/useBlockScrollIf'

import s from './BaseModal.module.scss'

const sx = withStyles(s)

export interface BaseModalProps extends ReactModal.Props {
  isOpen: boolean
  onClose: (e: React.MouseEvent<HTMLElement>) => void
  shouldCloseOnOverlayClick?: boolean
  className?: string
  overlayClassName?: string
  closeTimeoutMS?: number
  children?: React.ReactNode
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  shouldCloseOnOverlayClick = true,
  closeTimeoutMS = 0,
  className,
  children,
  ...rest
}) => {
  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      onClose(e)
    },
    [onClose]
  )

  useBlockScrollIf(isOpen)

  return (
    // @ts-ignore:next-line
    <ReactModal
      closeTimeoutMS={closeTimeoutMS}
      isOpen={isOpen}
      className={sx(s.modal, className)}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      onRequestClose={shouldCloseOnOverlayClick ? handleClose : undefined}
      {...rest}>
      {children}
    </ReactModal>
  )
}
