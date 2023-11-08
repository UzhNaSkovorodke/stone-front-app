import { CalendarDay } from 'shared/components/Calendar/CalendarBody/CalendarDay'
import React, { FC, useEffect, useState } from 'react'
import { useCalendar } from './hooks/useCalendar'
import { calendarData } from '../index'
import { checkDateIsEqual, checkIsToday, formatDate } from './utils/helpers/date'

import classes from '../Calendar.module.scss'
import { TabButton } from 'shared/uikit/TabButton'

interface CalendarBody {
  calendarData: calendarData[]
  selectedDate: Date
  selectDate: (date: Date) => void
}

export const CalendarBody: FC<CalendarBody> = ({ selectedDate, selectDate, calendarData }) => {
  const { functions, state } = useCalendar({
    selectedDate: selectedDate,
  })

  const checkTimes = (day: string, calendarData: calendarData[]) => {
    const index = calendarData.findIndex((data) => data.day === day)
    return index > -1
  }
  const isDisableBtn = (countOfDays: number) => {
    const date = new Date()
    date.setDate(date.getDate() + countOfDays)
    return !checkTimes(formatDate(date, 'YYYY-MM-DD'), calendarData)
  }
  const getNextData = (countOfDays: number) => {
    const date = new Date()
    date.setDate(date.getDate() + countOfDays)
    if (checkTimes(formatDate(date, 'YYYY-MM-DD'), calendarData)) {
      selectDate(date)
      functions.setAnotherDay(date)
    }
  }

  const [isTomorrow, setIsTomorrow] = useState<boolean>(false)
  const [isDayAfter, setIsDayAfter] = useState<boolean>(false)

  useEffect(() => {
    if (new Date().getDate() + 1 === new Date(selectedDate).getDate()) {
      setIsTomorrow(true)
    }
    if (new Date().getDate() + 2 === new Date(selectedDate).getDate()) {
      setIsDayAfter((prev) => !prev)
    }
    setIsDayAfter(false)
    setIsTomorrow(false)
  }, [selectedDate])

  const checkDate = (stateFunOne: any, stateFunTwo: any, state: boolean, day: number) => {
    !state && new Date().getDate() + day !== new Date(selectedDate).getDate()
      ? getNextData(day)
      : getNextData(0)
    stateFunOne(!state)
    stateFunTwo(false)
  }

  return (
    <>
      <div className={classes.header}>
        <h3>Выберите дату</h3>
        <div className={classes.filter}>
          <TabButton
            variant="3"
            width="auto"
            size="small"
            type="checkbox"
            name="data-check"
            text="Завтра"
            onChange={() => checkDate(setIsTomorrow, setIsDayAfter, isTomorrow, 1)}
            disabled={isDisableBtn(1)}
            checked={
              isTomorrow || new Date().getDate() + 1 === new Date(selectedDate).getDate()
            }></TabButton>
          <TabButton
            variant="3"
            width="auto"
            size="small"
            type="checkbox"
            name="data-check"
            text="Поселзавтра"
            onChange={() => checkDate(setIsDayAfter, setIsTomorrow, isDayAfter, 2)}
            disabled={isDisableBtn(2)}
            checked={
              isDayAfter || new Date().getDate() + 2 === new Date(selectedDate).getDate()
            }></TabButton>
        </div>
      </div>

      <div className={classes.main}>
        <div className={classes.weekNames}>
          {state.weekDaysNames.map((weekDaysName) => (
            <div className={classes.weekName} key={weekDaysName.dayShort}>
              {weekDaysName.dayShort}
            </div>
          ))}
        </div>
        <div className={classes.daysWrapper}>
          {state.calendarDays.map((day) => {
            const isToday = checkIsToday(day.date)
            const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date)
            const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex
            const isAvailable = checkTimes(formatDate(day.date, 'YYYY-MM-DD'), calendarData)

            return (
              <CalendarDay
                key={`${day.dayNumber}-${day.monthIndex}`}
                isToday={isToday}
                isSelectedDay={isSelectedDay}
                isAdditionalDay={isAdditionalDay}
                isAvailable={isAvailable}
                onClick={() => {
                  isAvailable && functions.setSelectedDay(day)
                  isAvailable && selectDate(day.date)
                }}>
                {day.dayNumber}
              </CalendarDay>
            )
          })}
        </div>
      </div>
    </>
  )
}
