import { ChangeEvent, forwardRef } from 'react'
import { Text } from '../../uikit/Text'

import s from './LangSwitcher.module.scss'

type InputProps = JSX.IntrinsicElements['input']
type LangSwitcherValue = 'ru' | 'en'

interface LangSwitcherProps extends Omit<InputProps, 'size' | 'onChange'> {
  initial: LangSwitcherValue
  onChange?: (value: LangSwitcherValue) => void
}

export const LangSwitcher = forwardRef<HTMLInputElement, LangSwitcherProps>(function LangSwitcher(
  { initial, onChange, ...inputProps },
  ref
) {
  return (
    <label className={s.root}>
      <input
        className={s.input}
        ref={ref}
        type="checkbox"
        defaultChecked={initial === 'ru'}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange?.((e.currentTarget.checked ? 'ru' : 'en') as LangSwitcherValue)
        }}
        {...inputProps}
      />
      <div className={s.wrapper}>
        <Text className={s.left} s="12" lh="16" w="400">
          RU
        </Text>
        <Text className={s.right} s="12" lh="16" w="400">
          EN
        </Text>
        <div className={s.circle} />
      </div>
    </label>
  )
})
