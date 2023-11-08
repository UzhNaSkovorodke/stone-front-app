export const formatPrice = (price?: number): string => {
  if (price === undefined || price === null) return ''

  return `${new Intl.NumberFormat('ru-Ru', {}).format(price)}`
}
