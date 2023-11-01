import React, { FC } from 'react'
import ButtonPropsInterface from './buttonPropsInterface'
import classes from './Button.module.scss'
import { useGenerateClasses } from 'shared/lib/hooks/useGenerateClasses'
import SvgIcon from 'shared/ui/svgIcon/SvgIcon'
import Link from 'next/link'

const Button: FC<ButtonPropsInterface> = ({ value, link, modifierClassesStyle = [''] }) => {
  const buttonModifierClasses = useGenerateClasses(classes, modifierClassesStyle)

  if (link) {
    return (
      <Link href={link} className={classes.button + ' ' + buttonModifierClasses}>
        {value}
        <div className={classes.button__icon}>
          <SvgIcon name="arrow" />
        </div>
      </Link>
    )
  } else {
    return (
      <div className={classes.button + ' ' + buttonModifierClasses}>
        {value}
        <div className={classes.button__icon}>
          <SvgIcon name="arrow" />
        </div>
      </div>
    )
  }
}

export default Button
