export default interface SwitcherPropsInterface {
  value1: string
  value2: string
  modifierClassesStyle?: string[]
  onChange?: (item: string) => void
}
