import React, { FC } from 'react'
import DescriptionLIstPropsInterface from './descriptionLIstPropsInterface'
import classes from './DescriptionList.module.scss'
import { useGenerateClasses } from 'shared/lib/hooks/useGenerateClasses'

const DescriptionList: FC<DescriptionLIstPropsInterface> = ({
  value,
  modifierClassesStyle = [''],
}) => {
  const descriptionListModifierClasses: string = useGenerateClasses(classes, modifierClassesStyle)

  return (
    <ul className={classes.list + ' ' + descriptionListModifierClasses}>
      {value.map((item) => (
        <li key={item} className={classes.list__item}>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default DescriptionList
