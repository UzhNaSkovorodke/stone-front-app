import { Color } from 'shared/styles/colors.module.scss'

export interface ColorProps {
  color?: keyof Color
}

export interface BackgroundColorProps {
  bgColor?: keyof Color
}
