import React, { FC } from 'react'

import classes from 'shared/components/Calendar/Calendar.module.scss'
import { TabButton } from 'shared/uikit/TabButton'

interface CalendarSelectTime {
  timesOfDate: string[] | boolean
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>
}

export const CalendarSelectTime: FC<CalendarSelectTime> = ({ timesOfDate, setSelectedTime }) => {
  return (
    <div className={classes.footer}>
      <div className={classes.selectTime}>Выберите время</div>

      <div className={classes.times}>
        {Array.isArray(timesOfDate)
          ? timesOfDate.map((elem) => {
              return (
                <TabButton
                  key={elem}
                  size="small"
                  width="full"
                  type="radio"
                  name="time_choose"
                  variant="3"
                  text={elem.slice(11, 16)}
                  onClick={() => setSelectedTime(elem)}
                />
              )
            })
          : false}
      </div>
    </div>
  )
}
