import { FC } from 'react'
import classes from './styles.module.scss'
import { Icon } from '../Icon'

interface ICloseButtonProps {
  onClick?: () => void
}

export const CloseButton: FC<ICloseButtonProps> = ({ onClick }) => {
  return (
    <div className={classes['close-button']} onClick={onClick}>
      <Icon name="close" />
    </div>
  )
}
