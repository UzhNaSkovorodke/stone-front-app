import { FocusEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'

import { BaseOption, LabelAndValueNames, LoadOptions, OnChange } from './types'
import { filterOption } from './util'

export interface UseSelectProps<T> extends LabelAndValueNames<T> {
  // eslint-disable-next-line
  valueProps: any
  minCharForSearch: number
  isMulti: boolean
  multiDisplayInputValue?: string
  loadOptions?: LoadOptions<T>
  onChange?: OnChange<BaseOption<T>>
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  propsOptions?: T[]
  disabled?: boolean
}

const DEFAULT_FOCUSED_OPTION_INDEX = -1

export const useSelect = <T extends Array<BaseOption<T>>>({
  loadOptions,
  minCharForSearch = 0,
  labelName,
  valueName,
  onChange,
  valueProps,
  propsOptions = [],
  onBlur,
  disabled,
  isMulti,
  multiDisplayInputValue,
}: UseSelectProps<T>) => {
  const [isOptionsOpened, setIsOptionsOpened] = useState<boolean>(false)
  const [options, setOptions] = useState(propsOptions)
  const [inputValue, setInputValue] = useState<string>(valueProps?.[labelName] || '')

  const [selectedOption, setSelectedOption] = useState(valueProps)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isHasPropsOptions = Boolean(propsOptions.length)

  useEffect(() => {
    setOptions(propsOptions)
  }, [propsOptions])

  useEffect(() => {
    setSelectedOption(valueProps)

    if (isMulti && selectedOption && selectedOption.length) {
      setInputValue(multiDisplayInputValue || '')
    } else {
      setInputValue(valueProps?.[labelName] || '')
    }
  }, [labelName, valueProps, isMulti, multiDisplayInputValue, selectedOption])

  const fetchOptions = useCallback(
    (query: string) =>
      loadOptions ? loadOptions(query).finally(() => setIsLoading(false)) : Promise.resolve([]),
    [loadOptions]
  )

  const _resetOptions = () => {
    setOptions(isHasPropsOptions ? propsOptions : [])
  }

  const currentFocusOptionIndex = useRef<number>(DEFAULT_FOCUSED_OPTION_INDEX)

  const _resetFocusOptionIndex = () => {
    currentFocusOptionIndex.current = DEFAULT_FOCUSED_OPTION_INDEX
  }

  const _setValueAfterBlur = () => {
    if (!selectedOption) setInputValue('')

    if (isMulti && selectedOption && selectedOption.length) {
      setInputValue(multiDisplayInputValue || '')
    } else {
      if (inputValue !== selectedOption?.[labelName]) {
        setInputValue(selectedOption?.[labelName] || '')
      }
    }
  }

  const handleInputChange = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const { value } = event.target

      setIsOptionsOpened(isHasPropsOptions ? true : value.length >= minCharForSearch)
      setIsLoading(Boolean(loadOptions))

      setInputValue(value)

      if (isHasPropsOptions) {
        setOptions(filterOption<T>({ value, labelName, propsOptions }))
      } else fetchOptions(value).then(setOptions)
    },
    [fetchOptions, isHasPropsOptions, labelName, loadOptions, minCharForSearch, propsOptions]
  )

  // eslint-disable-next-line
  const handleClickOption = (option: any) => {
    if (option.disabled) return

    if (!isMulti) {
      setSelectedOption(option)
      setInputValue(option[labelName])
      setIsOptionsOpened(false)
    } else {
      setSelectedOption((curr: any[]) => {
        if (curr && Array.isArray(curr)) {
          return isOptionSelected(curr, option, valueName)
            ? curr.filter((item) => option[valueName] !== item[valueName])
            : [...curr, option]
        }

        return [option]
      })
    }

    _resetOptions()
    _resetFocusOptionIndex()

    let value = option

    if (isMulti) {
      if (selectedOption && Array.isArray(selectedOption)) {
        value = isOptionSelected(selectedOption, option, valueName)
          ? selectedOption.filter((item) => option[valueName] !== item[valueName])
          : [...selectedOption, option]
      } else {
        value = [option]
      }
    }
    onChange?.(value)
  }

  const handleClickInput = () => {
    if (isOptionsOpened) {
      setIsOptionsOpened(false)
    } else if (!disabled) {
      setIsOptionsOpened(Boolean(options.length))
    }
  }

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsOptionsOpened(false)

    _resetFocusOptionIndex()
    _setValueAfterBlur()
    _resetOptions()

    onBlur?.(event)
  }

  const handleCloseModal = () => {
    _setValueAfterBlur()

    setIsOptionsOpened(false)
  }

  const optionsWrapperRef = useRef<HTMLDivElement>(null)

  const getOptionsNode = () =>
    optionsWrapperRef?.current?.querySelectorAll<HTMLElement>('[data-option-focus=on]') || []

  const setOptionFocus = (optionsNode: NodeListOf<HTMLElement> | never[]) => {
    const currentIndex = currentFocusOptionIndex.current

    optionsNode.forEach((item) => {
      item.removeAttribute('focus')
    })

    optionsNode[currentIndex]?.setAttribute('focus', 'on')
    optionsNode[currentIndex]?.scrollIntoView({
      block: 'nearest',
      behavior: 'auto',
    })
  }

  const changeCurrentOptionFocusedIndex = (direction: 'next' | 'previous') => {
    if (!isOptionsOpened) return null

    const optionsNode = getOptionsNode()

    const currentIndex = currentFocusOptionIndex.current
    const maxIndex = optionsNode?.length - 1

    if (direction === 'next') {
      if (currentIndex >= maxIndex) currentFocusOptionIndex.current = 0
      else currentFocusOptionIndex.current += 1
    }

    if (direction === 'previous') {
      if (currentIndex <= 0) currentFocusOptionIndex.current = maxIndex
      else currentFocusOptionIndex.current += -1
    }

    setOptionFocus(optionsNode)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isOptionsOpened) return

    switch (event.key) {
      case 'Escape':
        setIsOptionsOpened(false)
        _setValueAfterBlur()
        _resetOptions()
        _resetFocusOptionIndex()
        break

      case 'ArrowDown':
        event.preventDefault()
        changeCurrentOptionFocusedIndex('next')
        break
      case 'ArrowUp':
        event.preventDefault()
        changeCurrentOptionFocusedIndex('previous')
        break
      case 'Enter':
        {
          event.preventDefault()
          const optionsNode = getOptionsNode()

          optionsNode?.[currentFocusOptionIndex.current]?.click()
        }
        break
      default:
    }
  }
  // KEYBOARD CONTROL END

  return {
    data: {
      inputValue,
      options,
      selectedOption,
      optionsWrapperRef,
    },
    flags: {
      isOptionsOpened,
      isLoading,
      isShowNoResult:
        Boolean(inputValue.length) && !options.length && !isLoading && isHasPropsOptions,
    },
    actions: {
      onInputChange: handleInputChange,
      onClickOption: handleClickOption,
      onInputBlur: handleInputBlur,
      onClickInput: handleClickInput,
      onCloseModal: handleCloseModal,
      onKeyDown: handleKeyDown,
    },
  }
}

const isOptionSelected = (options: any[], option: any, valueName: string | number | symbol) => {
  return options.find((o) => option[valueName] === o[valueName])
}
