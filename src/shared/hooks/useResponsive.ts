import useMatchMedia from './useMatchMedia'

type Dimension = 's' | 'm' | 'l'

export const useResponsive = (dimension: Dimension) => useMatchMedia(QUERIES[dimension])

const QUERIES = {
  s: '(max-width: 1023px)',
  m: '(min-width: 1024px) and (max-width: 1439px)',
  l: '(min-width: 1440px)',
}
