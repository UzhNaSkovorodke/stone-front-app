import React, { FC, useEffect, useState } from 'react'
import AnimeSliderPropsInterface from 'shared/components/animeSlider/animeSliderPropsInterface'
import classes from 'shared/components/animeSlider/AnimeSlider.module.scss'
import SlideSequenceInterface from 'shared/components/animeSlider/slideSequenceInterface'
import { useGenerateClasses } from 'shared/hooks/useGenerateClasses'
import { useClientWidth } from 'shared/hooks/useClientWidth'

const AnimeSlider: FC<AnimeSliderPropsInterface> = ({
  slides,
  animationDuration = 300,
  delay = 0,
  emitCurrentSlide,
  modifierClassesStyle = [''],
}) => {
  const animeSliderModifierClasses = useGenerateClasses(classes, modifierClassesStyle)

  const [numberOfSlides, setNumberOfSlides] = useState<number | null>(null)

  const [prevCurrentSlideIndex, setPrevCurrentSlideIndex] = useState<number | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number | null>(null)
  const [prevSlideIndex, setPrevSlideIndex] = useState<number | null>(null)
  const [nextSlideIndex, setNextSlideIndex] = useState<number | null>(null)

  const [slideSequence, setSlideSequence] = useState<SlideSequenceInterface[]>([])
  const [additionalClasses, setAdditionalClasses] = useState<string[]>([])

  const [transitionDuration, setTransitionDuration] = useState<number>(0)
  const [isAnimationEnd, setIsAnimationEnd] = useState<boolean>(false)

  const [isClick, setIsClick] = useState<boolean>(false)
  const [timerSlide, setTimerSlide] = useState<ReturnType<typeof setTimeout> | null>(null)

  const clientWidth = useClientWidth()
  const isMobile = clientWidth < 768

  const clickOnSlide = (index: number, initIndex: number) => {
    if (isAnimationEnd && index !== currentSlideIndex) {
      setIsClick(true)

      changeSlide(index, initIndex)
    }
  }

  const changeSlide = (index: number, initIndex: number) => {
    setIsAnimationEnd(false)

    emitCurrentSlide(initIndex)

    setTransitionDuration(animationDuration)

    setPrevCurrentSlideIndex(currentSlideIndex)
    setCurrentSlideIndex(index)

    setPrevSlideIndex(index - 1)
    setNextSlideIndex(index + 1)
  }

  const generateAdditionalClasses = (slides: SlideSequenceInterface[]): string[] => {
    const _additionalClasses: string[] = []

    slides.forEach((slide, index) => {
      if (index === currentSlideIndex) {
        _additionalClasses.push(classes['is-current'])
      } else if (index === prevSlideIndex) {
        _additionalClasses.push(classes['is-prev'])
      } else if (index === nextSlideIndex) {
        _additionalClasses.push(classes['is-next'])
      } else {
        _additionalClasses.push(classes['is-hide'])
      }
    })

    return _additionalClasses
  }

  let x1: number | null = null
  let y1: number | null = null

  function handleTouchStart(evt: any) {
    x1 = evt.touches[0].clientX
    y1 = evt.touches[0].clientY
  }

  function handleTouchMove(evt: any, i: number, i2: number) {
    if (!x1 || !y1) {
      return false
    }

    const x2 = evt.touches[0].clientX

    const xDiff = x2 - x1

    if (isMobile) {
      if (Math.abs(xDiff) > 30 && xDiff > x1) {
        clickOnSlide(i + 1, i2)
      } else if (xDiff < -30 && xDiff < x1) {
        clickOnSlide(i - 1, i2)
      }
    }
  }

  //01_init
  useEffect(() => {
    if (slideSequence.length === 0) {
      const _slideSequence: SlideSequenceInterface[] = slides.map((slide, index) => {
        return {
          image: slide,
          initIndex: index,
        }
      })

      for (let i = 0; i < Math.floor(_slideSequence.length / 2); i++) {
        const deletedElement = _slideSequence.pop()
        if (deletedElement) {
          _slideSequence.unshift(deletedElement)
        }
      }

      setSlideSequence(_slideSequence)
      setNumberOfSlides(_slideSequence.length)
    }
  }, [slides])

  //02_init расставления индексов для слайдов
  useEffect(() => {
    if (numberOfSlides) {
      setPrevCurrentSlideIndex(currentSlideIndex)
      setCurrentSlideIndex(numberOfSlides - Math.round(numberOfSlides / 2))
      setPrevSlideIndex(numberOfSlides - (Math.round(numberOfSlides / 2) + 1))
      setNextSlideIndex(numberOfSlides - (Math.round(numberOfSlides / 2) - 1))
    }
  }, [numberOfSlides])

  useEffect(() => {
    if (nextSlideIndex && !isAnimationEnd) {
      //перегруппировака слайдов и перерасчет индексов после анимации
      setTimeout(() => {
        const _slideSequence: SlideSequenceInterface[] = [...slideSequence]

        if (
          currentSlideIndex &&
          prevCurrentSlideIndex &&
          currentSlideIndex < prevCurrentSlideIndex
        ) {
          const deletedElement = _slideSequence.pop()
          if (deletedElement) {
            _slideSequence.unshift(deletedElement)
          }

          setCurrentSlideIndex(currentSlideIndex + 1)
          setPrevSlideIndex(currentSlideIndex)
          setNextSlideIndex(currentSlideIndex + 2)
        } else if (
          currentSlideIndex &&
          prevCurrentSlideIndex &&
          currentSlideIndex > prevCurrentSlideIndex
        ) {
          const deletedElement = _slideSequence.shift()
          if (deletedElement) {
            _slideSequence.push(deletedElement)
          }

          setCurrentSlideIndex(currentSlideIndex - 1)
          setPrevSlideIndex(currentSlideIndex - 2)
          setNextSlideIndex(currentSlideIndex)
        }

        setTransitionDuration(0)

        setSlideSequence(_slideSequence)

        setIsAnimationEnd(true)
      }, Number(animationDuration))

      setAdditionalClasses(generateAdditionalClasses(slideSequence))
    }
  }, [nextSlideIndex])

  useEffect(() => {
    if (isAnimationEnd) {
      setAdditionalClasses(generateAdditionalClasses(slideSequence))

      // автоматическая прокрутка
      if (delay >= 1000) {
        const timer = setTimeout(() => {
          if (nextSlideIndex) {
            const currentSlide = slideSequence.find((slide, index) => {
              return index === nextSlideIndex
            })

            if (currentSlide) {
              changeSlide(nextSlideIndex, currentSlide.initIndex)
            }
          }
        }, delay + animationDuration)

        setTimerSlide(timer)
      }
    }
  }, [isAnimationEnd])

  useEffect(() => {
    if (isClick && timerSlide) {
      clearTimeout(timerSlide)
      setTimerSlide(null)

      setIsClick(false)
    }
  }, [isClick])

  return (
    <div className={classes.slider + ' ' + animeSliderModifierClasses}>
      <div className={classes.slider__slider}>
        {slideSequence.map((slide, index) => (
          <div
            key={index}
            className={
              classes.slider__item +
              ' ' +
              (additionalClasses[index] !== undefined ? additionalClasses[index] : '')
            }
            style={{
              backgroundImage: 'url(' + slide.image + ')',
              transitionProperty: 'width, height, margin, opacity',
              transitionDuration: transitionDuration + 'ms',
              transitionTimingFunction: 'ease-in-out',
            }}
            onTouchStart={(e) => handleTouchStart(e)}
            onTouchMove={(e) => handleTouchMove(e, index, slide.initIndex)}
            onClick={() => clickOnSlide(index, slide.initIndex)}></div>
        ))}
      </div>
    </div>
  )
}

export default AnimeSlider
