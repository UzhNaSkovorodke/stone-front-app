import type { Meta, StoryObj } from '@storybook/react'

import { Text } from '../../uikit/Text'
import { Box } from '../../uikit/Box'
import { Flex } from '../../uikit/Flex'
import { Metro } from './Metro'

const args: React.ComponentProps<typeof Metro> = {
  color: ['#2C7B55', '#90BEBF'],
  name: 'Белорусская, Савеловская',
  time: '5 мин, 15 мин',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Metro> = {
  title: 'Components/Metro',
  component: Metro,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Metro>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    color: ['#2C7B55', '#90BEBF'],
    name: 'Белорусская, Савеловская',
    time: '5 мин, 15 мин',
  },
}

export const AllVariants: Story = {
  render: () => {
    return (
      <>
        <Text s="24" lh="32" mb="1">
          White
        </Text>
        <Box p="2">
          <Text>Medium</Text>
          <Flex ai="center" g="1">
            <Metro
              color={['#2C7B55', '#90BEBF']}
              s="medium"
              name="Белорусская"
              time="5 минут, 15 минут"
              variant="white"
            />
          </Flex>
          <Text mt="2">Large</Text>
          <Flex ai="center" g="1">
            <Metro color={['#2C7B55', '#90BEBF']} s="large" name="Белорусская" variant="white" />
          </Flex>
        </Box>

        <Text s="24" lh="32" mb="1" mt="3">
          Black
        </Text>
        <Box bgColor="neutrals-gray-1" p="2">
          <Text color="neutrals-white">Medium</Text>
          <Flex ai="center" g="1">
            <Metro
              color={['#2C7B55', '#90BEBF']}
              s="medium"
              name="Белорусская"
              time="5 минут, 15 минут"
              variant="black"
            />
          </Flex>
          <Text color="neutrals-white" mt="2">
            Large
          </Text>
          <Flex ai="center" g="1">
            <Metro color={['#2C7B55', '#90BEBF']} s="large" name="Белорусская" variant="black" />
          </Flex>
        </Box>

        <Text s="24" lh="32" mb="1" mt="3">
          Office
        </Text>
        <Box bgColor="primary-office" p="2">
          <Text color="neutrals-white">Medium</Text>
          <Flex ai="center" g="1">
            <Metro
              color={['#2C7B55', '#90BEBF']}
              s="medium"
              name="Белорусская"
              time="5 минут, 15 минут"
              variant="office"
            />
          </Flex>
          <Text color="neutrals-white" mt="2">
            Large
          </Text>
          <Flex ai="center" g="1">
            <Metro color={['#2C7B55', '#90BEBF']} s="large" name="Белорусская" variant="office" />
          </Flex>
        </Box>
      </>
    )
  },
}
