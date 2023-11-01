import React, { FC } from 'react'
import ButtonRoundPropsInterface from './buttonRoundPropsInterface'
import classes from './ButtonRound.module.scss'
import { useGenerateClasses } from 'shared/lib/hooks/useGenerateClasses'
import SvgIcon from 'shared/ui/svgIcon/SvgIcon'
import Link from 'next/link'

const ButtonRound: FC<ButtonRoundPropsInterface> = ({
  link,
  modifierClassesStyle = [''],
  onClick,
}) => {
  const buttonModifierClasses = useGenerateClasses(classes, modifierClassesStyle)

  if (link) {
    return (
      <Link href={link} className={classes.button + ' ' + buttonModifierClasses}>
        <div className={classes.button__icon}>
          <SvgIcon name="arrow_l" />
        </div>
      </Link>
    )
  } else {
    return (
      <button onClick={onClick} className={classes.button + ' ' + buttonModifierClasses}>
        <div className={classes.button__icon}>
          <SvgIcon name="arrow_l" />
        </div>
      </button>
    )
  }
}

export default ButtonRound
