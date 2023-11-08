import { ButtonBase, ButtonBaseProps } from '../../uikit/ButtonBase'
import { Icon } from '../../uikit/Icon'

import s from './ButtonCloseModal.module.scss'

interface ButtonCloseModalProps extends ButtonBaseProps {}

export const ButtonCloseModal = (props: ButtonCloseModalProps) => {
  return (
    <ButtonBase className={s.button} {...props}>
      <Icon name="close" s="24" color="neutrals-gray-1" />
    </ButtonBase>
  )
}
