export interface DefaultOption {
  label?: string
  value?: string
  disabled?: boolean
}

export type BaseOption<T> = T & DefaultOption

export type LoadOptions<T> = (query: string) => Promise<T[]>
export type OnClickOption<T> = (option: BaseOption<T>) => void
export type OnChange<T> = (option: T | null) => void
export type InputValue = string

export interface RenderOptionProps<T> {
  option: BaseOption<T>
  isSelected: boolean
  index: number
  onClickOption: OnClickOption<T>
}

export interface LabelAndValueNames<T> {
  valueName: keyof BaseOption<T>
  labelName: keyof BaseOption<T>
}

export type SelectSize = 'medium' | 'large'
