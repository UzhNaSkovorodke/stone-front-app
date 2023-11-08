export const checkIsToday = (date: Date) => {
  const today = new Date()

  return checkDateIsEqual(today, date)
}

export const checkDateIsEqual = (date1: Date, date2: Date) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear()
