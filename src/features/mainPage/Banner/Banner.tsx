import { IDefaultSlide } from 'shared/services/pageData/default/default.interface'
import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import cls from './Banner.module.scss'

interface IBlockBannerProps {
  slider: IDefaultSlide[]
}

export const Banner: FC<IBlockBannerProps> = ({ slider }) => {
  const [numberOfSlides, setNumberOfSlides] = useState<number | null>(null)

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [sliderTimer, setSliderTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  const transitionDuration = 200
  const delay = 5000

  const [isClick, setIsClick] = useState<boolean>(false)
  const [isAnimation, setIsAnimation] = useState<boolean>(false)

  const slides = [...slider?.map((slide) => slide.title)]

  const chooseSlide = (index: number) => {
    if (!isAnimation && index !== currentSlide) {
      setIsClick(true)
      setCurrentSlide(index)
    }
  }

  useEffect(() => {
    if (!numberOfSlides) {
      setNumberOfSlides(slides.length)
    }
  }, [slides])

  useEffect(() => {
    setIsAnimation(true)

    setTimeout(() => {
      setIsAnimation(false)
    }, transitionDuration * 2)
  }, [currentSlide])

  useEffect(() => {
    if (!isAnimation && delay > 1000) {
      const timer = setTimeout(() => {
        if (numberOfSlides && currentSlide >= numberOfSlides - 1) {
          setCurrentSlide(0)

          return
        }

        setCurrentSlide(currentSlide + 1)
      }, delay)

      setSliderTimer(timer)
    }
  }, [isAnimation])

  useEffect(() => {
    if (isClick && sliderTimer) {
      clearTimeout(sliderTimer)
      setSliderTimer(null)

      setIsClick(false)
    }
  }, [isClick])

  return (
    <section className={['layout__section ', cls.main_banner].join('')}>
      <div className={cls.main_banner__progress_bar} key={currentSlide}></div>

      <div className={cls.main_banner__container}>
        <div className={cls.main_banner__slides}>
          {slider &&
            slider.map((slide, index) => (
              <Link
                href={slide.mediaUrl}
                className={[
                  cls.main_banner__slide + ' ' + (currentSlide === index ? cls.is_active : ''),
                ].join('')}
                key={slide.id}
                style={{
                  transitionProperty: 'opacity, bottom, top',
                  transitionDuration: transitionDuration + 'ms',
                  transitionDelay: currentSlide === index ? transitionDuration + 'ms' : '0ms',
                  transitionTimingFunction: 'ease-in-out',
                }}>
                <span>{slide.title}</span>
              </Link>
            ))}
        </div>

        <div className={cls.main_banner__dots}>
          {slider &&
            slider.map((slide, index) => (
              <div
                className={[
                  cls.main_banner__dot + ' ' + (currentSlide === index ? cls.is_active : ''),
                ].join('')}
                key={slide.id}
                onClick={() => chooseSlide(index)}>
                <div className={cls.main_banner__dot_elem}></div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
