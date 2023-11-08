import React, { FC } from 'react'
import classes from 'shared/components/switcher/Switcher.module.scss'
import SwitcherPropsInterface from 'shared/components/switcher/switcherPropsInterface'
import { useGenerateClasses } from 'shared/hooks/useGenerateClasses'

const Switcher: FC<SwitcherPropsInterface> = ({
  value1,
  value2,
  modifierClassesStyle = [''],
  // Временное решение, нужен был рабочий свитч
  onChange,
}) => {
  const switcherModifierClasses = useGenerateClasses(classes, modifierClassesStyle)

  return (
    <label className={classes.switcher + ' ' + switcherModifierClasses}>
      <input className={classes.switcher__checkbox} type="checkbox" />
      <div className={classes.switcher__switch}></div>
      <div className={classes.switcher__values}>
        <div
          className={classes.switcher__value}
          onClick={() => (onChange ? onChange(value1) : null)}>
          {value1}
        </div>
        <div
          className={classes.switcher__value}
          onClick={() => (onChange ? onChange(value2) : null)}>
          {value2}
        </div>
      </div>
    </label>
  )
}

export default Switcher
