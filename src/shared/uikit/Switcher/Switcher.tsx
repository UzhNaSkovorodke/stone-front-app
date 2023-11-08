import { withStyles } from '@bruitt/classnames'

import s from './Switcher.module.scss'
import { Columns, Grid } from '../Grid'
import { Text } from '../Text'
import { Children, cloneElement, forwardRef, isValidElement } from 'react'
import { ButtonBaseProps } from '../ButtonBase'

const sx = withStyles(s)

type BaseInputProps = JSX.IntrinsicElements['input']

interface SwitcherProps {
  children?: React.ReactElement<ButtonBaseProps> | React.ReactElement<ButtonBaseProps>[]
  variant?: SwitcherVariant
  cols?: Columns
}

export const SWITCHER_VARIANTS = {
  blackFill: 'blackFill',
  officeFill: 'officeFill',
  domFill: 'domFill',
}

export type SwitcherVariant = keyof typeof SWITCHER_VARIANTS

const Switcher = ({ cols = '4', variant = 'officeFill', children }: SwitcherProps) => {
  if (!children || !Array.isArray(children)) return null

  const rows = Math.ceil(children.length / Number(cols))

  return (
    <Grid cols={cols} className={sx(s.root, { rows, variant })}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child) && children)
          return cloneElement(child, {
            className: sx(s.item, {
              isLastInFirstRow: index + 1 === Math.ceil(children.length / Number(rows)),
              isFirstInLastRow: index + 1 === (rows - 1) * Number(cols) + 1,
              isFirstColumn: (index + 1) % Number(cols) === 1,
              isFirstRow: index < Number(cols),
              isDisabled: child.props.disabled,
            }),
          })

        return child
      })}
    </Grid>
  )
}

const SwitcherItem = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const { children, className, ...rest } = props

  return (
    <label>
      <input ref={ref} type="checkbox" {...rest} />

      <div className={className}>
        <Text className={s.text} s="14" lh="20" w="500" align="center" color="neutrals-gray-1">
          {children}
        </Text>
      </div>
    </label>
  )
})

SwitcherItem.displayName = 'SwitcherItem'

const SwitcherNamespace = Object.assign(Switcher, { Item: SwitcherItem })

export { SwitcherNamespace as Switcher }
