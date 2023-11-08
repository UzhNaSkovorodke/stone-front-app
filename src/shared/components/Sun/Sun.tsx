import s from './Sun.module.scss'
import { Flex } from '../../uikit/Flex'
import { Text } from '../../uikit/Text'
import { Icon } from '../../uikit/Icon'
import { useEffect, useRef, useState } from 'react'

import { withStyles } from '@bruitt/classnames'
import { isSunny, useSun } from './useSun'

const sx = withStyles(s)

const DEGREES_PER_MINUTE = 1440 / 360

interface SunProps {
  size: 's' | 'm' | 'l'
  lat: number | null
  lon: number | null
  className?: string
  children?: React.ReactNode
  azimuth: number
}

const LABEL_WIDTH = 73
const LABEL_HEIGHT = 40

const config = {
  s: {
    path: 'M 166.5207 0.5372 a 165.9835 165.9835 90 0 1 0 331.967 a 165.9835 165.9835 90 0 1 0 -331.967',
    diameter: '332',
    transformOrigin: '166.5px 166.5px',
  },
  m: {
    path: 'M 260.3769 0.3745 a 260.0024 260.0024 90 0 1 0 520.0048 a 260.0024 260.0024 90 0 1 0 -520.0048',
    diameter: '520',
    transformOrigin: '260.4px 260.4px',
  },
  l: {
    path: 'M 310 1 a 309 309 90 0 1 0 618 a 309 309 90 0 1 0 -618',
    diameter: '620',
    transformOrigin: '50% 50%',
  },
}

export const Sun = ({ size = 'm', className, lat, lon, azimuth }: SunProps) => {
  const rootRef = useRef(null)
  const labelRef = useRef(null)
  const pathRef = useRef<SVGPathElement>(null)

  const [pathLength, setPathLength] = useState(0)

  const { diameter, path, transformOrigin } = config[size]

  const {
    data: { selectedTime, sunrise, sunset, strokeDashoffset, gradientY1, gradientY2, pathRotation },
  } = useSun({ rootRef, labelRef, pathRef, diameter, lat, lon, azimuth })
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [])

  const sunriseMinutes = sunrise.getMinutes() + sunrise.getHours() * 60
  console.log("h" + sunrise.getHours() + "; " + sunrise.getMinutes())
  return (
    <div className={sx(s.root, className)} ref={rootRef}>
      <svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          ref={pathRef}
          id="path"
          strokeWidth="2"
          d={path}
          stroke="#777E91"
          fill="transparent"
          strokeDasharray={pathLength}
          style={{transformOrigin: "center",
            transform: "rotate(156deg)"}}
        />

        <path
          strokeWidth="2"
          d={path}
          stroke="url(#gradient)"
          strokeDashoffset={strokeDashoffset}
          strokeDasharray={pathLength}
          style={{
            transform: `rotate(${(sunriseMinutes / DEGREES_PER_MINUTE) + (azimuth ?? 0)}deg)`,
            transformOrigin,
          }}
        />

        <foreignObject ref={labelRef} x="0" y="0" width={LABEL_WIDTH} height={LABEL_HEIGHT}>
          <div className={s.label}>
            <Flex
              className={sx(s.sunLabel, {
                isSunny: isSunny(selectedTime, sunrise, sunset),
              })}
              ai="center"
              jc="center">
              <Text s="12" lh="16" w="500" color="neutrals-gray-1">
                {selectedTime}
              </Text>
              <Icon name="brightnessUpFilled" s="16" color="secondary-yellow" />
            </Flex>
          </div>
        </foreignObject>
        <defs>
          <linearGradient
            id="gradient"
            gradientUnits="userSpaceOnUse"
            x1="0%"
            x2="0%"
            y1={`${gradientY1}%`}
            y2={`${gradientY2}%`}
            gradientTransform={`rotate(${-pathRotation})`}>
            <stop offset={`${0}}%`} stopColor="#777E91" />
            <stop offset={`${100}%`} stopColor="#E9B737" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
