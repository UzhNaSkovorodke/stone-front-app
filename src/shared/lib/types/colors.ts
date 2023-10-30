import { Color } from 'app/ui/styles/colors.module.scss'

export interface ColorProps {
  color?: keyof Color
}

export interface BackgroundColorProps {
  bgColor?: keyof Color
}
