export const SORT_OPTIONS = [
  { label: 'По убыванию цены (общей)', value: '-lots.selling_price' },
  { label: 'По возрастанию цены (общей)', value: 'lots.selling_price' },
  { label: 'По убыванию площади', value: '-lots.area' },
  { label: 'По возрастанию площади', value: 'lots.area' },
] as const
