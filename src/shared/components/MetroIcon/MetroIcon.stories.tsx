import type { Meta, StoryObj } from '@storybook/react'

import { MetroIcon } from './index'
import { Text } from '../../uikit/Text'
import { Flex } from '../../uikit/Flex'
import { Box } from '../../uikit/Box'

const args: React.ComponentProps<typeof MetroIcon> = {
  color: '#2C7B55',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MetroIcon> = {
  title: 'Components/MetroIcon',
  component: MetroIcon,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof MetroIcon>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    color: '#2C7B55',
  },
}

export const TwoCircles: Story = {
  args: {
    color: ['#2C7B55', '#90BEBF', 'red'],
  },
}

export const AllVariants: Story = {
  render: () => {
    return (
      <>
        <Text s="24" lh="32" mb="1">
          For white background
        </Text>
        <Box p="2">
          <Flex ai="center" g="1">
            <Text>Medium</Text>
            <MetroIcon color="#2C7B55" s="medium" />
            <MetroIcon color={['#2C7B55', '#90BEBF']} s="medium" />
          </Flex>
          <Flex ai="center" g="1">
            <Text>Large</Text>
            <MetroIcon color={['#2C7B55', '#90BEBF']} s="large" />
          </Flex>
        </Box>

        <Text s="24" lh="32" mb="1" mt="3">
          For black background
        </Text>
        <Box bgColor="neutrals-gray-1" p="2">
          <Flex ai="center" g="1">
            <Text color="neutrals-white">Medium</Text>
            <MetroIcon color="#2C7B55" s="medium" variant="black" />
            <MetroIcon color={['#2C7B55', '#90BEBF']} s="medium" variant="black" />
          </Flex>
          <Flex ai="center" g="1">
            <Text color="neutrals-white">Large</Text>
            <MetroIcon color={['#2C7B55', '#90BEBF']} s="large" variant="black" />
          </Flex>
        </Box>

        <Text s="24" lh="32" mb="1" mt="3">
          For primary-office background
        </Text>
        <Box bgColor="primary-office" p="2">
          <Flex ai="center" g="1">
            <Text color="neutrals-white">Medium</Text>
            <MetroIcon color="#2C7B55" s="medium" variant="office" />
            <MetroIcon color={['#2C7B55', '#90BEBF']} s="medium" variant="office" />
          </Flex>
          <Flex ai="center" g="1">
            <Text color="neutrals-white">Large</Text>
            <MetroIcon color={['#2C7B55', '#90BEBF']} s="large" variant="office" />
          </Flex>
        </Box>
      </>
    )
  },
}
