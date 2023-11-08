import { MetroIcon, MetroIconProps } from '../MetroIcon'
import { Text } from '../../uikit/Text'
import { Flex } from '../../uikit/Flex'

interface MetroProps {
  color: MetroIconProps['color']
  name: string
  time?: string
  variant?: 'white' | 'black' | 'office'
  s?: 'medium' | 'large'
  children?: React.ReactNode
}

export const Metro = ({ color, name, time, s = 'medium', variant = 'white' }: MetroProps) => {
  return (
    <Flex g="1" ai="center">
      <MetroIcon color={color} variant={variant} s={s} />
      <Text
        s={s === 'medium' ? '12' : '20'}
        lh={s === 'medium' ? '16' : '32'}
        w={s === 'medium' ? '500' : '400'}
        color={variant === 'white' ? 'neutrals-gray-3' : 'neutrals-white'}>
        {name}
      </Text>
      {time && (
        <Text s="12" lh="16" w="400" color="neutrals-gray-4">
          {time}
        </Text>
      )}
    </Flex>
  )
}
