import { withStyles } from '@bruitt/classnames'
import {
  Children,
  FocusEvent,
  MouseEvent,
  MutableRefObject,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useRef,
} from 'react'

import style from './InputWrapper.module.scss'

const sx = withStyles(style)

type InputProps = JSX.IntrinsicElements['input']
type InputSize = 'medium' | 'large'

export interface InputWrapperProps extends InputProps {
  isError?: boolean
  variant?: 'blackStroke' | 'blackFill' | 'whiteStroke' | 'whiteFill'
  pre?: ReactNode
  post?: ReactNode
  disabled?: boolean
  className?: string
  placeholder?: string
  inputBoxClassName?: string
  name?: string
  s?: InputSize
  s_s?: InputSize
  s_m?: InputSize
  s_l?: InputSize
  isSelect?: boolean
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
  children?: ReactNode
}

export type InputVariantName = keyof typeof INPUT_VARIANTS_MAP

export const INPUT_VARIANTS_MAP = {
  blackStroke: 'blackStroke',
  blackFill: 'blackFill',
  whiteStroke: 'whiteStroke',
  whiteFill: 'whiteFill',
}
export const InputWrapper = forwardRef<HTMLInputElement, InputWrapperProps>(
  (
    props,
    // костыль для InputNumber, т.к. react-number-format не принимает ref и не получается фокусить при клике на InputWrapper
    ref
  ) => {
    const {
      isError = false,
      variant = INPUT_VARIANTS_MAP.blackStroke,
      s = 'medium',
      s_s,
      s_m,
      s_l,
      disabled,
      pre,
      post,
      children,
      className,
      isSelect,
      onClick,
    } = props
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      if (inputRef?.current) {
        inputRef.current?.focus?.()

        onClick?.(event)
      }
    }

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement

      if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) {
        event.preventDefault()
      }
    }

    return (
      <div
        className={sx('root', className, {
          s,
          s_s,
          s_m,
          s_l,
          variant,
          isError,
          disabled,
        })}
        onClick={handleClick}
        onMouseDown={handleMouseDown}>
        {pre && <span className={style.enhancer}>{pre}</span>}

        {Children.map(
          children,
          (child) =>
            isValidElement(child) &&
            cloneElement(child as ReactElement, {
              className: sx(style.input, child?.props?.inputBoxClassName, {
                isPre: Boolean(pre),
                isPost: Boolean(post),
              }),
              onBlur: (
                event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
              ) => {
                // @ts-ignore
                child.props?.onBlur?.(event)
              },
              onFocus: (
                event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
              ) => {
                // @ts-ignore
                child.props?.onFocus?.(event)
              },
              /**
               * getInputRef is used for react-number-format
               * as input-wrapper's child, because it can't accept basic ref.
               */
              // @ts-expect-error how to set types for name?
              ...(['NumericFormat', 'PatternFormat'].includes(child.type?.name)
                ? {
                    getInputRef: (input: HTMLInputElement) => {
                      inputRef.current = input
                      if (ref) {
                        ;(ref as MutableRefObject<HTMLInputElement>).current = input
                      }
                    },
                  }
                : {
                    ref: (node: never) => {
                      inputRef.current = node
                      // @ts-ignore
                      if (typeof child?.ref === 'function') child.ref?.(node)
                      // @ts-ignore
                      else if (child.ref) child.ref.current = node
                    },
                  }),
            })
        )}

        {post && (
          <span className={isSelect ? style.enhancer + ' ' + style.selectEnhancer : style.enhancer}>
            {post}
          </span>
        )}
      </div>
    )
  }
)

InputWrapper.displayName = 'InputWrapper'
