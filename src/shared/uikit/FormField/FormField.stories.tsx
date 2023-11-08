import type { Meta, StoryObj } from '@storybook/react'

import { FormField } from './index'
import { Input } from '../Input'
import { Flex } from '../Flex'
import { InputNumber } from '../InputNumber'

const args: React.ComponentProps<typeof FormField> = {}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FormField> = {
  title: 'UIKit/FormField',
  component: FormField,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof FormField>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: (args) => (
    <FormField {...args}>
      <Input placeholder="Placeholder" id="id" />
    </FormField>
  ),
  args: {
    label: 'Input label',
    htmlFor: 'id',
  },
}

export const CustomLabel: Story = {
  render: (args) => (
    <FormField {...args}>
      <Input placeholder="Placeholder" id="id" />
    </FormField>
  ),
  args: {
    label: (
      <div
        style={{
          fontSize: 20,
          lineHeight: '20px',
          fontWeight: 700,
          color: '#b1b5c3',
          textTransform: 'uppercase',
        }}>
        Custom label
      </div>
    ),
    htmlFor: 'id',
  },
}

export const Group: Story = {
  render: () => (
    <Flex dir="column" g="1">
      <FormField label="First name" htmlFor="firstName">
        <Input placeholder="First name" id="firstName" />
      </FormField>
      <FormField label="Last name" htmlFor="lastName">
        <Input placeholder="Last name" id="lastName" />
      </FormField>
      <FormField label="City" htmlFor="city">
        <Input placeholder="City" id="city" />
      </FormField>
      <FormField label="Address" htmlFor="address">
        <Input placeholder="Address" id="address" />
      </FormField>
      <FormField label="Age" htmlFor="age">
        <InputNumber placeholder="Age" id="age" />
      </FormField>
    </Flex>
  ),
}
