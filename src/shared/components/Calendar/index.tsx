import { CalendarBody } from 'shared/components/Calendar/CalendarBody'
import { formatDate } from 'shared/components/Calendar/CalendarBody/utils/helpers/date'
import { CalendarSelectTime } from 'shared/components/Calendar/CalendarSelectTime'
import React, { FC, Dispatch, SetStateAction, useEffect } from 'react'
import classes from 'shared/components/Calendar/Calendar.module.scss'

export interface calendarData {
  day: string
  time: string[]
}

interface Calendar {
  calendarData: calendarData[]
  selectedDate: Date
  selectedTime: string
  setSelectedDay: Dispatch<SetStateAction<any>>
  setSelectedTime: Dispatch<SetStateAction<any>>
}

export const Calendar: FC<Calendar> = ({
  calendarData,
  selectedDate,
  setSelectedDay,
  setSelectedTime,
}) => {
  const checkTimes = (date: string, calendarData: calendarData[]) => {
    const index = calendarData.findIndex((data) => data.day === date)
    if (index > -1) return calendarData[index].time
    else return false
  }

  useEffect(() => {
    setSelectedTime('')
  }, [selectedDate])

  return (
    <div className={classes.root}>
      <CalendarBody
        calendarData={calendarData}
        selectedDate={selectedDate}
        selectDate={(date) => setSelectedDay(date)}
      />
      <CalendarSelectTime
        setSelectedTime={setSelectedTime}
        timesOfDate={checkTimes(formatDate(selectedDate, 'YYYY-MM-DD'), calendarData)}
      />
    </div>
  )
}
