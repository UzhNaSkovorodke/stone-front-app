export const getWeekNumber = (date: Date) => {
  const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfTheYear.getTime()) / 86400000

  return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7)
}
export const getMonthNumberOfDays = (
  monthIndex: number,
  yearNumber: number = new Date().getFullYear()
) => new Date(yearNumber, monthIndex + 1, 0).getDate()
