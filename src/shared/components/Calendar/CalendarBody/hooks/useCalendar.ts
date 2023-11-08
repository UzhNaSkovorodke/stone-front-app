import React from 'react'

import { createDate, createMonth, formatDate, getWeekDaysNames } from '../utils/helpers/date'

interface UseCalendarParams {
  locale?: string
  selectedDate: Date
  firstWeekDayNumber?: number
}

const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10
  return [...Array(10)].map((_, index) => startYear + index)
}

export const useCalendar = ({
  locale = 'default',
  selectedDate: date,
  firstWeekDayNumber = 2,
}: UseCalendarParams) => {
  const [selectedDay, setSelectedDay] = React.useState(createDate({ date }))
  const [selectedMonth, setSelectedMonth] = React.useState(
    createMonth({
      date: new Date(selectedDay.year, selectedDay.monthIndex),
      locale,
    })
  )
  const [selectedYear, setSelectedYear] = React.useState(selectedDay.year)
  const [selectedYearsInterval, setSelectedYearsInterval] = React.useState(
    getYearsInterval(selectedDay.year)
  )

  const weekDaysNames = React.useMemo(() => getWeekDaysNames(firstWeekDayNumber, locale), [])

  const currentMonthDays = React.useMemo(
    () => selectedMonth.createMonthDays(),
    [selectedMonth, selectedYear]
  )

  const calendarDays = React.useMemo(() => {
    let countDaysLeft = 21
    const result = []

    // eslint-disable-next-line unused-imports/no-unused-vars
    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays()
    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays()

    const index = currentMonthDays.findIndex(
      (data) => formatDate(data.date, 'YYYY-MM-DD') === formatDate(new Date(), 'YYYY-MM-DD')
    )
    const shiftIndex = currentMonthDays.length - 1 - index

    if (shiftIndex > countDaysLeft - 2) {
      result.push(...currentMonthDays.slice(index, index + countDaysLeft))
      countDaysLeft -= countDaysLeft
    }
    if (shiftIndex < countDaysLeft - 1) {
      countDaysLeft -= shiftIndex
      result.push(...currentMonthDays.slice(index, currentMonthDays.length - 1))
    }
    if (countDaysLeft > 0) {
      result.push(...nextMonthDays.slice(0, countDaysLeft))
    }
    return result
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear])

  const setSelectedMonthByIndex = (monthIndex: number) => {
    setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }))
  }

  const setAnotherDay = (date: Date) => {
    setSelectedDay(createDate({ date }))
  }

  return {
    state: {
      calendarDays,
      weekDaysNames,
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedYearsInterval,
    },
    functions: {
      setSelectedDay,
      setSelectedMonthByIndex,
      setSelectedYear,
      setSelectedYearsInterval,
      setAnotherDay,
    },
  }
}
