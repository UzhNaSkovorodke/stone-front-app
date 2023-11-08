import { withStyles } from '@bruitt/classnames'

import s from './Grid.module.scss'

const sx = withStyles(s)

export type Columns = '1' | '2' | '3' | '4' | '5' | '6'
type Factor = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
type GridItems = 'start' | 'end' | 'center' | 'stretch'
type GridDisplay = 'grid' | 'inline-grid' | 'none'

interface GridProps {
  className?: string
  display?: GridDisplay
  ji?: GridItems
  ai?: GridItems
  pi?: GridItems
  cols?: Columns
  g?: Factor
  cg?: Factor
  rg?: Factor
  // responsive props
  // display
  display_s?: GridDisplay
  display_m?: GridDisplay
  display_l?: GridDisplay
  // columns
  cols_s?: Columns
  cols_m?: Columns
  cols_l?: Columns
  // gap
  g_s?: Factor
  g_m?: Factor
  g_l?: Factor
  // column-gap
  cg_s?: Factor
  cg_m?: Factor
  cg_l?: Factor
  // row-gap
  rg_s?: Factor
  rg_m?: Factor
  rg_l?: Factor
  // justify-items
  ji_s?: GridItems
  ji_m?: GridItems
  ji_l?: GridItems
  // align-items
  ai_s?: GridItems
  ai_m?: GridItems
  ai_l?: GridItems
  // place-items
  pi_s?: GridItems
  pi_m?: GridItems
  pi_l?: GridItems

  children?: React.ReactNode
}

export const Grid = ({ children, className, ...rest }: GridProps) => {
  return <div className={sx('root', className, rest)}>{children}</div>
}
