import { withStyles } from '@bruitt/classnames'

import s from './MobileSelect.module.scss'
import { Popover as TinyPopover } from 'react-tiny-popover'
import { Icon } from '../Icon'
import { Flex } from '../Flex'
import { useState } from 'react'

const sx = withStyles(s)

export interface MobileSelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

interface MobileSelectProps {
  options: readonly MobileSelectOption[]
  onChange: (option: MobileSelectOption) => void
  control: (onOpenOptions: () => void) => React.ReactElement
  value?: MobileSelectOption
  variant?: 'blackStroke' | 'blackFill' | 'whiteStroke' | 'whiteFill'
  disabled?: boolean
}

export const MobileSelect = ({
  control,
  options,
  value,
  onChange,
  variant = 'blackStroke',
}: MobileSelectProps) => {
  const [selectedOption, setSelectedOption] = useState<MobileSelectOption | undefined>(value)
  const [isOptionsOpened, setIsOptionsOpened] = useState<boolean>(false)

  const handleToggleOptions = () => {
    setIsOptionsOpened((curr) => !curr)
  }

  const handleClickOption = (option: MobileSelectOption) => {
    setSelectedOption(option)
    onChange(option)
    handleToggleOptions()
  }

  const content = (
    <div className={sx(s.optionList, { variant })}>
      {options.map((o) => {
        const isSelected = o.value === selectedOption?.value
        return (
          <Flex
            key={o.value}
            onClick={() => handleClickOption(o)}
            className={sx(s.option, {
              isSelected,
              s,
              variant,
              disabled: o.disabled,
            })}
            jc="space-between">
            <div>{o.label}</div>
            {isSelected && <Icon s="20" color="secondary-green" name="check2" />}
          </Flex>
        )
      })}
    </div>
  )

  return (
    <TinyPopover
      containerStyle={{ width: '100%', zIndex: '1' }}
      isOpen={isOptionsOpened}
      content={content}
      positions={['bottom', 'left']}
      onClickOutside={(e) => {
        e.preventDefault()
        handleToggleOptions()
      }}>
      {control(handleToggleOptions)}
    </TinyPopover>
  )
}
