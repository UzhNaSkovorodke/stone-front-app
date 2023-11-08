import s from './Line.module.scss'
import { forwardRef } from 'react'

interface ILine {
  variant: 'fromTop' | 'fromDown'
  rotate?: string
  className?: string
}

const Line = forwardRef<HTMLDivElement, ILine>(
  ({ variant, className, rotate = '-75', ...rest }, ref) => {
    return (
      <>
        <div
          className={`${s.body} ${className}`}
          style={{ transform: `rotate(${rotate}deg)` }}
          ref={ref}
          {...rest}>
          <div className={`${s.line} ${variant}`} />
        </div>
      </>
    )
  }
)
Line.displayName = 'Line'
export default Line
