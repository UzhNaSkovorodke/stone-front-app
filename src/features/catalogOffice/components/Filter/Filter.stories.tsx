import type { Meta, StoryObj } from '@storybook/react'
import { PLACEHOLDER_VALUES } from '../../constants/placeholderValues'

import { Filter } from './index'

const args: React.ComponentProps<typeof Filter> = {
  variant: 'wide',
  inputValue: () => null,
  features: ['2 гардеробных', 'Ванная с окном', 'Вид на реку', 'Окна на закат'],
  onChange: () => () => null,
  onBlur: () => null,
  values: {
    ...PLACEHOLDER_VALUES,
    features: ['2 гардеробных', 'Ванная с окном', 'Вид на реку', 'Окна на закат'],
    businessType: ['1', '2', '3'],
  },
  options: {
    selected: [
      { value: '4', label: 'STONE towers D', disabled: false },
      { value: '1', label: 'STONE towers A', disabled: false },
      { value: '2', label: 'STONE towers B', disabled: false },
      { value: '3', label: 'STONE towers C', disabled: false },
    ],
    years: [
      { value: '2023', label: '2023', disabled: false },
      { value: '2007', label: '2007', disabled: true },
      { value: '2024', label: '2024', disabled: false },
    ],
    locations: [
      { value: 'Алтуфьево', label: 'Алтуфьево', disabled: false },
      { value: 'Автозаводская', label: 'Автозаводская', disabled: true },
      { value: 'Багратионовская', label: 'Багратионовская', disabled: false },
      { value: 'Аэропорт', label: 'Аэропорт', disabled: false },
      {
        value: 'Александровский сад',
        label: 'Александровский сад',
        disabled: false,
      },
    ],
    house: [
      { value: '5', label: '5', disabled: false },
      { value: '6', label: '6', disabled: false },
      { value: '2', label: '2', disabled: false },
      { value: '4', label: '4', disabled: false },
      { value: '1', label: '1', disabled: false },
      { value: '7', label: '7', disabled: false },
      { value: '3', label: '3', disabled: false },
    ],
    features: [
      { value: '2 гардеробных', label: '2 гардеробных', disabled: false },
      { value: 'Ванная с окном', label: 'Ванная с окном', disabled: false },
      { value: 'Вид на реку', label: 'Вид на реку', disabled: false },
      { value: 'Окна на закат', label: 'Окна на закат', disabled: false },
      { value: 'Окна на рассвет', label: 'Окна на рассвет', disabled: false },
    ],
    businessType: [
      { value: '3', label: '3', disabled: false },
      { value: '2', label: '2', disabled: false },
      { value: '1', label: '1', disabled: false },
    ],
    isCorner: true,
    isCatering: true,
    decoration: true,
    waterPipes: true,
  },
  onSubmitSearch: () => null,
  businessTypes: {
    'Конференц-зал': 3,
    Столовая: 2,
    Фитнес: 1,
  },
  isError: false,
  isLoadingSearch: false,
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Filter> = {
  title: 'Features/CatalogOffice/Filter',
  component: Filter,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Filter>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
