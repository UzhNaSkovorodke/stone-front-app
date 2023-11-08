import { Ref, useEffect, useState } from 'react'
import Suncalc from 'suncalc'
import { closestPoint } from './dragByPath'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'

interface Options {
  diameter: string
  lat: number | null
  lon: number | null
  rootRef: Ref<HTMLDivElement>
  labelRef: Ref<HTMLDivElement>
  pathRef: Ref<SVGPathElement>
  azimuth: number
}

gsap.registerPlugin(Draggable)

export const useSun = ({ rootRef, labelRef, pathRef, diameter, lat, lon, azimuth }: Options) => {
  const today = new Date()
  const [selectedTime, setSelectedTime] = useState(dateTimeToTimeString(today))
  const [strokeDashoffset, setStrokeDashoffset] = useState(0)
  // TODO был useLayoutEffect, убрал временно чтобы next не ругался. Вернуть когда будем чинить солнышко
  useEffect(() => {
    const ctx = gsap.context(() => {
      // @ts-ignore
      const path: SVGPathElement = pathRef.current
      // @ts-ignore
      const drag: HTMLDivElement = labelRef.current

      const pathLength = path?.getTotalLength() || 0
      const pathPerMinute = pathLength / (24 * 60)
      const cLength = Math.PI * Number(diameter) * (azimuth/360)
      const startPointLengthOffset = (pathPerMinute * timeStringToMinutes(selectedTime)) + cLength > pathLength ? (pathPerMinute * timeStringToMinutes(selectedTime) + cLength) - pathLength : pathPerMinute * timeStringToMinutes(selectedTime) + cLength
      const startPoint = path.getPointAtLength(startPointLengthOffset)
      const strokeDashoffset = ((100 - lightSidePercentage) / 100) * Math.PI * Number(diameter)
      setStrokeDashoffset(strokeDashoffset)

      const pointModifier = (
        point: gsap.Point2D
      ): { newPoint: gsap.Point2D; distance: number; rotation: number } => {
        const p = closestPoint(path, pathLength, point)

        return {
          newPoint: p.point,
          distance: p.distance,
          rotation: p.rotation,

        }
      }

      Draggable.create(drag, {
        liveSnap: {
          points: (point: gsap.Point2D) => {
            const p = pointModifier(point)
            let angle = (p.rotation < 0 ? 360 + p.rotation  : p.rotation ) / 360
            angle *= 360; // Преобразование в диапазон [0, 360]
            angle += 360-azimuth; // Смещение на 20 градусов
            angle = angle % 360; // Проверка и возврат в диапазон [0, 360]
            angle /= 360; // Возврат в исходный диапазон [0, 1]
            setSelectedTime(
              () =>
                `${addTimeZeros(Math.floor(angle * 24))}:${addTimeZeros(
                  Math.floor(angle * 24 * 60) % 60
                )}`
            )

            return p.newPoint
          },
        },
      })

      gsap.set(drag, {
        transformOrigin: 'center',
        xPercent: -50,
        yPercent: -50,
        x: startPoint.x,
        y: startPoint.y,
      })
      // @ts-ignore
    }, rootRef)

    return () => ctx.revert()
  },[])

  const { sunrise, sunset } = Suncalc.getTimes(new Date(), Number(lat), Number(lon))

  const dayLength = (sunset.valueOf() - sunrise.valueOf()) / 3600000
  const lightSidePercentage = Math.round((dayLength / 24) * 100)

  const { y1, y2 } = getGradientCoordinates(lightSidePercentage)

  const  pathRotation = 180 - (lightSidePercentage * 180) / 100

  return {
    data: {
      selectedTime,
      sunrise,
      sunset,
      lightSidePercentage,
      strokeDashoffset,
      pathRotation,
      gradientY1: y1,
      gradientY2: y2,
    },
  }
}

const dateTimeToTimeString = (date: Date): string => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${addTimeZeros(hours)}:${addTimeZeros(minutes)}`
}

export const timeStringToMinutes = (time: string): number => {
  const arr = time.split(':')
  return Number(arr[0]) * 60 + Number(arr[1])
}

const addTimeZeros = (num: number): string => {
  return num < 10 ? `0${num}` : num.toString()
}

export const isSunny = (time: string, sunrise: Date, sunset: Date) => {
  const date = new Date()
  date.setHours(0)
  date.setMinutes(timeStringToMinutes(time))
  date.setSeconds(0)

  const minutes = timeStringToMinutes(time)
  const sunriseMinutes = sunrise.getMinutes() + sunrise.getHours() * 60
  const sunsetMinutes = sunset.getMinutes() + sunset.getHours() * 60

  return minutes >= sunriseMinutes && minutes <= sunsetMinutes
}

export const getGradientCoordinates = (lightSidePercentage: number) => {
  let y1 = 0
  let y2 = 0

  switch (true) {
    case lightSidePercentage >= 25 && lightSidePercentage < 40:
      y1 = lightSidePercentage + 10
      y2 = y1 + 5
      break
    case lightSidePercentage >= 40 && lightSidePercentage < 45:
      y1 = lightSidePercentage + 7
      y2 = y1 + 5
      break
    case lightSidePercentage >= 45 && lightSidePercentage < 50:
      y1 = lightSidePercentage + 5
      y2 = y1 + 5
      break
    case lightSidePercentage >= 50 && lightSidePercentage < 55:
      y1 = lightSidePercentage + 2
      y2 = y1 + 5
      break
    case lightSidePercentage >= 55 && lightSidePercentage < 60:
      y1 = lightSidePercentage - 8
      y2 = y1 + 10
      break
    case lightSidePercentage >= 60 && lightSidePercentage < 65:
      y1 = lightSidePercentage - 14
      y2 = y1 + 10
      break
    case lightSidePercentage >= 65 && lightSidePercentage < 90:
      y1 = 100 - lightSidePercentage + 10
      y2 = y1 + 15
      break
  }

  return { y1, y2 }
}
