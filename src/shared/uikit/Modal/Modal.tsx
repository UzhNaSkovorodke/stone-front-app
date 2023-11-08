import { withStyles } from '@bruitt/classnames'

import styles from './Modal.module.scss'
import { BaseModal, BaseModalProps } from '../BaseModal'

const sx = withStyles(styles)

export interface ModalProps extends BaseModalProps {}

export const Modal: React.FC<ModalProps> = ({ className, overlayClassName, ...rest }) => {
  return (
    <BaseModal
      className={sx(styles.root, className)}
      overlayClassName={sx(styles.overlay, overlayClassName)}
      shouldCloseOnOverlayClick
      {...rest}
    />
  )
}
