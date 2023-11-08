export const getStringDate = function(date: string): string {
  return new Date(date).toLocaleString('default', { day: 'numeric', month: 'long' })
}

export const getStringTime = function(date: string): string {
  return new Date(date).toLocaleString('default', { hour: 'numeric', minute: 'numeric' })
}

export const getTomorrowDate = function(date: string, className: string): React.ReactNode | string  {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf()
  const bookingDate = new Date(date)
  const booking = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate()).valueOf()

  return (
      (booking > today && (booking <= today + 86400000)) ?
        <span className={className}>завтра</span>
      :
        getStringDate(date)
  )
}
