import { withStyles } from '@bruitt/classnames'
import { pick, omit, keys } from 'rambda'

import s from './Text.module.scss'
import { Box, BoxProps } from '../Box'
import { TextAlign } from '../../types/typography'

const sx = withStyles(s)

type FontSize = '12' | '14' | '16' | '20' | '24' | '32' | '40'
type LineHeight = '16' | '20' | '24' | '32' | '40' | '48'
type FontWeight = '400' | '500'

interface FontProps {
  // font-weight
  w?: FontWeight
  w_s?: FontWeight
  w_m?: FontWeight
  w_l?: FontWeight
  // font-size
  s?: FontSize
  s_s?: FontSize
  s_m?: FontSize
  s_l?: FontSize
  // line-height
  lh?: LineHeight
  lh_s?: LineHeight
  lh_m?: LineHeight
  lh_l?: LineHeight
  // text-align
  align?: TextAlign
  align_s?: TextAlign
  align_m?: TextAlign
  align_l?: TextAlign
}

type TextPropsKey = keyof FontProps

const TEXT_PROPS: { [key in TextPropsKey]: true } = {
  w: true,
  w_s: true,
  w_m: true,
  w_l: true,
  s: true,
  s_s: true,
  s_m: true,
  s_l: true,
  lh: true,
  lh_s: true,
  lh_m: true,
  lh_l: true,
  align: true,
  align_s: true,
  align_m: true,
  align_l: true,
}

const TEXT_PROPS_KEYS = keys(TEXT_PROPS)

interface TextProps extends FontProps, BoxProps {
}

export const Text = ({ children, className, html,  ...props }: TextProps) => {
  const textProps = pick(TEXT_PROPS_KEYS, props)
  const rest = omit(TEXT_PROPS_KEYS, props)

  if (!html) {
    return (
      <Box className={sx(className, textProps)} {...rest }>
        {children}
      </Box>
    )
  }

  return (
    <Box className={sx(className, textProps)} {...rest } html={html}/>
  )
}

