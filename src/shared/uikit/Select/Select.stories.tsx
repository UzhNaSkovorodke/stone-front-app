import type { Meta, StoryObj } from '@storybook/react'

import { SELECT_VARIANTS, Select, SelectVariant } from './index'
import { Icon } from '../Icon'
import { Flex } from '../Flex'
import { Box } from '../Box'
import { Text } from '../Text'
import { Color } from '../../styles/colors.module.scss'
import { keys } from 'rambda'
import { useState } from 'react'
import { BaseOption } from './types'
import { getDeclension } from '../../utils/getDeclension'

const args: React.ComponentProps<typeof Select> = {
  value: null,
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Select> = {
  title: 'UIKit/Select',
  component: Select,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Select>

const DATA: Array<{ label: string; value: number; disabled?: boolean }> = [
  { label: 'Item 1', value: 1 },
  { label: 'Item 2', value: 2 },
  { label: 'Item 3', value: 3 },
  { label: 'Item 4', value: 4 },
  { label: 'Item 5', value: 5, disabled: true },
  { label: 'Item 6', value: 6 },
  { label: 'Item 7', value: 7 },
  { label: 'Item 8', value: 8 },
  { label: 'Item 9', value: 9 },
  { label: 'Item 10', value: 10 },
]

const CUSTOM_DATA: Array<{ name: string; id: number }> = [
  { name: 'Item 1', id: 1 },
  { name: 'Item 2', id: 2 },
  { name: 'Item 3', id: 3 },
  { name: 'Item 4', id: 4 },
  { name: 'Item 5', id: 5 },
  { name: 'Item 6', id: 6 },
  { name: 'Item 7', id: 7 },
  { name: 'Item 8', id: 8 },
  { name: 'Item 9', id: 9 },
  { name: 'Item 10', id: 10 },
]

const BG: { [key in SelectVariant]: keyof Color } = {
  blackStroke: 'neutrals-white',
  blackFill: 'neutrals-white',
  whiteStroke: 'neutrals-gray-1',
  whiteFill: 'neutrals-gray-1',
}

const COLOR: { [key in SelectVariant]: keyof Color } = {
  blackStroke: 'neutrals-gray-1',
  blackFill: 'neutrals-gray-1',
  whiteStroke: 'neutrals-white',
  whiteFill: 'neutrals-white',
}

const SingleWithHooks = () => {
  const [value, setValue] = useState<BaseOption<any>[]>([])

  const handleChange = (option: BaseOption<any>) => {
    setValue(option)
  }

  return <Select {...Primary.args} value={value} onChange={handleChange} />
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: (args) => <SingleWithHooks {...args} />,
  args: {
    options: DATA,
    placeholder: 'Select',
  },
}

const MultiWithHooks = () => {
  const [values, setValues] = useState<BaseOption<any>[]>([])
  const displayInputValue = `${getDeclension(values.length, ['Выбран', 'Выбрано', 'Выбрано'])} ${
    values.length
  } ${getDeclension(values.length, ['проект', 'проекта', 'проектов'])}`

  const handleChange = (options: any) => {
    setValues(options)
  }

  return (
    <Select
      {...Primary.args}
      value={values}
      onChange={handleChange}
      isMulti
      multiDisplayInputValue={displayInputValue}
    />
  )
}

export const Multi: Story = {
  render: () => <MultiWithHooks />,
}

export const CustomLabelAndValue: Story = {
  args: {
    ...Primary.args,
    options: CUSTOM_DATA,
    //@ts-ignore
    labelName: 'name',
    //@ts-ignore
    valueName: 'id',
  },
}

export const CustomOption: Story = {
  args: {
    ...Primary.args,
    renderOption: ({ option, isSelected, onClickOption }) => (
      <div style={{ cursor: option.disabled ? 'initial' : 'pointer' }}>
        <Box p="2" onClick={() => onClickOption(option)}>
          <Flex ai="center" g="1">
            <Icon name={isSelected ? 'locationFilled' : 'location'} s="20" />
            {option.label} {isSelected ? '+' : null}
          </Flex>
        </Box>
      </div>
    ),
  },
}

export const Error: Story = {
  args: {
    ...Primary.args,
    isError: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <Flex dir="column">
      {keys(SELECT_VARIANTS).map((v) => (
        <Flex key={v} dir="column" g="2" p="2" bgColor={BG[v]}>
          <Text s="20" lh="24" color={COLOR[v]}>
            {v}
          </Text>
          <Flex g="3" ai="center">
            {/* @ts-ignore */}
            <Select s="large" placeholder="Large" options={DATA} variant={v} value={} />
            {/* @ts-ignore */}
            <Select s="medium" placeholder="Small" options={DATA} variant={v} value={} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
}
