import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '../Box'
import { Button } from '../Button'
import { Flex } from '../Flex'
import { Input } from '../Input'
import { Text } from '../Text'

import { Popover } from './index'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Popover> = {
  title: 'UIKit/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: {},
}

export default meta
type Story = StoryObj<typeof Popover>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: (args) => (
    <Flex jc="center" ai="center" my="10">
      <Popover
        {...args}
        render={({ isOpen, toggle }) => (
          <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
        )}
        content={({ close }) => (
          <Box p="4">
            <Text s="12" lh="16" w="400">
              Номер лота
            </Text>
            <Flex g="1" mt="1">
              <Input placeholder="Введите номер" />
              <Button onClick={close} s="medium">
                Close
              </Button>
            </Flex>
          </Box>
        )}
      />
    </Flex>
  ),
}
