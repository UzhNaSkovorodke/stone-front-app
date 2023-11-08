import type { Meta, StoryObj } from '@storybook/react'

import { DisableWrapper } from './index'
import { FormField } from '../FormField'
import { Input } from '../Input'
import { Button } from '../Button'
import { Select } from '../Select'
import { InputGroupped } from '../InputGroupped'
import { InputNumber } from '../InputNumber'
import { Flex } from '../Flex'
import { Switcher } from '../Switcher'

const args: React.ComponentProps<typeof DisableWrapper> = {
  isDisabled: true,
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DisableWrapper> = {
  title: 'UIKit/DisableWrapper',
  component: DisableWrapper,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof DisableWrapper>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: (args) => (
    <DisableWrapper {...args}>
      <FormField label="Input label">
        <Input placeholder="Placeholder" />
      </FormField>
    </DisableWrapper>
  ),
  args: {},
}

export const Controls: Story = {
  render: (args) => (
    <>
      <div style={{ width: 300 }}>
        <DisableWrapper {...args}>
          <Flex g="1" dir="column">
            <FormField label="Input label">
              <Input placeholder="Placeholder" />
            </FormField>
            <FormField label="Select">
              <Select placeholder="Placeholder" value="" />
            </FormField>
            <FormField label="Input Groupped">
              <InputGroupped>
                <InputNumber placeholder="1" />
                <InputNumber placeholder="100" />
              </InputGroupped>
            </FormField>
            <FormField label="Switcher">
              <Switcher cols="2">
                <Switcher.Item>Item 1</Switcher.Item>
                <Switcher.Item>Item 2</Switcher.Item>
                <Switcher.Item>Item 3</Switcher.Item>
                <Switcher.Item>Item 4</Switcher.Item>
              </Switcher>
            </FormField>

            <Button>Button</Button>
          </Flex>
        </DisableWrapper>
      </div>
    </>
  ),
  args: {
    isDisabled: true,
  },
}
