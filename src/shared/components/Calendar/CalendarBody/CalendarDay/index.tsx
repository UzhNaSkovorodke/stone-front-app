import { FC, ReactNode } from 'react'

import classes from '../../Calendar.module.scss'

interface Index {
  children: ReactNode
  isToday: boolean
  isSelectedDay: boolean
  isAdditionalDay: boolean
  isAvailable: boolean
  onClick: () => void
}

export const CalendarDay: FC<Index> = ({
  isToday,
  isSelectedDay,
  isAvailable,
  children,
  ...props
}) => {
  return (
    <div
      className={[
        classes.day,
        isToday ? classes.day_today : '',
        isAvailable && isSelectedDay ? classes.day_selected : '',
        !isAvailable ? classes.day_outTime : '',
      ].join(' ')}
      {...props}>
      {children}
    </div>
  )
}
