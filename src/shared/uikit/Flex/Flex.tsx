import { withStyles } from '@bruitt/classnames'
import { pick, omit, keys } from 'rambda'
import { Box, BoxProps } from '../Box'

import s from './Flex.module.scss'

const sx = withStyles(s)

type Factor = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse'
type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse'
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
type GrowShrink = '0' | '1' | '2' | '3' | '4'

interface FlexModelProps {
  g?: Factor
  cg?: Factor
  rg?: Factor
  dir?: Direction
  w?: Wrap
  jc?: JustifyContent
  ai?: AlignItems
  gr?: GrowShrink
  sh?: GrowShrink
  // responsive props
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
  // flex-direction
  dir_s?: Direction
  dir_m?: Direction
  dir_l?: Direction
  // flex-wrap
  w_s?: Wrap
  w_m?: Wrap
  w_l?: Wrap
  // jusctify-content
  jc_s?: JustifyContent
  jc_m?: JustifyContent
  jc_l?: JustifyContent
  // align-items
  ai_s?: AlignItems
  ai_m?: AlignItems
  ai_l?: AlignItems
  // flex-grow
  gr_s?: GrowShrink
  gr_m?: GrowShrink
  gr_l?: GrowShrink
  // flex-shrink
  sh_s?: GrowShrink
  sh_m?: GrowShrink
  sh_l?: GrowShrink
}

type FlexPropsKey = keyof FlexModelProps

const FLEX_PROPS: { [key in FlexPropsKey]: true } = {
  g: true,
  cg: true,
  rg: true,
  dir: true,
  w: true,
  jc: true,
  ai: true,
  gr: true,
  sh: true,
  g_s: true,
  g_m: true,
  g_l: true,
  cg_s: true,
  cg_m: true,
  cg_l: true,
  rg_s: true,
  rg_m: true,
  rg_l: true,
  dir_s: true,
  dir_m: true,
  dir_l: true,
  w_s: true,
  w_m: true,
  w_l: true,
  jc_s: true,
  jc_m: true,
  jc_l: true,
  ai_s: true,
  ai_m: true,
  ai_l: true,
  gr_s: true,
  gr_m: true,
  gr_l: true,
  sh_s: true,
  sh_m: true,
  sh_l: true,
}
const FLEX_PROPS_KEYS = keys(FLEX_PROPS)

export interface FlexProps extends FlexModelProps, BoxProps {}

export const Flex = ({ children, className, display = 'flex', ...props }: FlexProps) => {
  const flexProps = pick(FLEX_PROPS_KEYS, props)
  const rest = omit(FLEX_PROPS_KEYS, props)

  return (
    <Box className={sx(className, flexProps)} display={display} {...rest}>
      {children}
    </Box>
  )
}
