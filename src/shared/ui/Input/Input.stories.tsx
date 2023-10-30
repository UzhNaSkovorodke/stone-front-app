import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from '../Icon'
import { Text } from '../Text'

import { Input } from './index'
import { INPUT_VARIANTS_MAP, InputVariantName } from '../InputWrapper'
import { Flex } from '../Flex'

const meta: Meta<typeof Input> = {
  title: 'UIKit/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

const VARIANT_LABELS = {
  blackStroke: 'Black Stroke',
  blackFill: 'Black Fill',
  whiteStroke: 'White Stroke',
  whiteFill: 'White Fill',
}

export const Primary: Story = {
  args: {
    placeholder: 'Placeholder',
  },
}

export const Variants: Story = {
  render: () => {
    return (
      <Flex dir="column" g="2">
        <Text w="500">Medium</Text>
        {Object.keys(INPUT_VARIANTS_MAP).map((variant) => {
          return (
            <Flex key={variant} dir="column">
              {VARIANT_LABELS[variant as InputVariantName]}
              <Input
                variant={variant as InputVariantName}
                name={variant}
                placeholder="Placeholder"
                s="medium"
              />
            </Flex>
          )
        })}

        <Text w="500" mt="2">
          Large
        </Text>
        {Object.keys(INPUT_VARIANTS_MAP).map((variant) => {
          return (
            <Flex key={variant} dir="column">
              {VARIANT_LABELS[variant as InputVariantName]}
              <Input
                variant={variant as InputVariantName}
                name={variant}
                placeholder="Placeholder"
                s="large"
              />
            </Flex>
          )
        })}
      </Flex>
    )
  },
}

export const WithPre: Story = {
  args: {
    ...Primary.args,
    pre: <Icon s="24" name="location" />,
  },
}

export const WithPost: Story = {
  args: {
    ...Primary.args,
    post: '₽',
  },
}

export const WithPreAndPost: Story = {
  args: {
    ...Primary.args,
    ...WithPre.args,
    ...WithPost.args,
  },
}

export const Error: Story = {
  args: {
    ...WithPreAndPost.args,
    isError: true,
  },
}

export const Disabled: Story = {
  args: {
    ...Primary.args,
    value: 'Value',
    disabled: true,
  },
}
