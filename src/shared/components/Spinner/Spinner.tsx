import { Icon } from 'shared/uikit/Icon'
import classes from './Spinner.module.scss'

export const Spinner = ({}) => {
  return (
    <div className={classes.spinner}>
      <Icon name="spinnerWhite" />
    </div>
  )
}
