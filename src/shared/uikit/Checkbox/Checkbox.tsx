import React, { forwardRef } from 'react'
import classes from './Checkbox.module.scss'
import { useGenerateClasses } from '../../hooks/useGenerateClasses'
import { Icon } from '../Icon'

interface ICheckboxProps {
  children?: React.ReactNode
  isChecked: boolean | null
  isError?: boolean
  modifierClassesStyle?: string[]
  emitIsChecked: (isChecked: boolean) => void
}

const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  (
    { children, isChecked = false, isError = false, modifierClassesStyle = [''], emitIsChecked },
    ref
  ) => {
    const checkboxModifierClasses: string = useGenerateClasses(classes, modifierClassesStyle)

    return (
      <label
        className={`
      ${classes.checkbox}
      ${checkboxModifierClasses}
      ${isChecked ? classes.isChecked : ''}
      ${isError ? classes.isError : ''}
    `}>
        <input type="checkbox" ref={ref} onChange={() => emitIsChecked(!isChecked)} />

        <span className={classes.checkbox__elem}>{isChecked && <Icon name={'check2'} />}</span>

        {children}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
