import classes from 'src/features/commercialDetailsPage/ConstructionProgress/ConstructionProgress.module.scss'
import { ICommercialProjectBlockProgress } from 'shared/services/pageData/commercialProject/commercialProject.interface'
import { IDefaultSlideWithVideo } from 'shared/services/pageData/default/default.interface'
import { generateOpacity } from 'shared/utils/GenerateOpacity'
import dynamic from 'next/dynamic'
import React, { FC, useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.scss'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

interface IGeneratedTitle {
  title: string
  opacity: number
}

interface IConstructionProgressProps {
  constructionProgress: ICommercialProjectBlockProgress
}

export const ConstructionProgress: FC<IConstructionProgressProps> = ({ constructionProgress }) => {
  let slides: IDefaultSlideWithVideo[] = []
  if (constructionProgress.progress.length > 1) {
    slides = [
      ...constructionProgress.progress,
      ...constructionProgress.progress,
      ...constructionProgress.progress,
    ]
  } else {
    slides = [...constructionProgress.progress]
  }
  const slidesTitles: string[] = slides.map((slide: IDefaultSlideWithVideo) => slide.title)
  const videos: string[] = slides.map((slide: IDefaultSlideWithVideo) => slide.mediaUrl)
  const [windowWidth, setWindowWidth] = useState(0)

  //на 1440
  const getCountSlides = (sliderLength: number, windowWidth: number): number => {
    if (sliderLength > 7 && windowWidth >= 1440) return 6
    if (sliderLength > 12 && windowWidth <= 1441 && windowWidth > 1100) return 12
    if (sliderLength > 9 && windowWidth <= 1101 && windowWidth > 768) return 9
    if (sliderLength > 6 && windowWidth <= 769) return 6
    if (sliderLength === 1) {
      return 1
    }
    return 7
  }
  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  const transitionDuration = 500
  const sliderRef = useRef<Slider>(null)
  const settings = {
    arrows: false,
    slidesToShow: getCountSlides(slides.length, windowWidth),
    dots: false,
    infinite: slides.length !== 1,
    slidesToScroll: 1,
    variableWidth: true,
    swipeToSlide: true,
    focusOnSelect: true,
    beforeChange: (current: number, nextSlide: number) => setCurrentSlide(nextSlide),
    afterChange: (current: number) => setCurrentSlide(current),
  }

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [generatedTitle, setGeneratedTitle] = useState<IGeneratedTitle[]>([])

  const getOpacity = (
    currentSlide: number,
    indexElement: number,
    slidesLength: number,
    item: IGeneratedTitle
  ): number => {
    if (currentSlide === 0 && indexElement === slidesLength - 1) return 0.5
    if (currentSlide === 0 && indexElement === slidesLength - 2) return 0.3
    if (currentSlide === 0 && indexElement === slidesLength - 3) return 0.2

    if (currentSlide === slidesLength - 1 && indexElement === 0) return 0.5
    if (currentSlide === slidesLength - 1 && indexElement === 1) return 0.3
    if (currentSlide === slidesLength - 1 && indexElement === 2) return 0.2
    return item.opacity
  }

  useEffect(() => {
    setGeneratedTitle(generateOpacity(slidesTitles, currentSlide))
  }, [currentSlide])

  return (
    <section className={classes.blockList}>
      <div className={classes.blockList__item}>
        <div className={classes.teaser}>
          <div className={classes.teaser__header}>
            <div className={classes.teaser__title}>{constructionProgress.title}</div>

            <div className={classes.teaser__body}>
              {slides.map((item, index) => (
                <div
                  key={index}
                  className={
                    classes.teaser__content + ' ' + (currentSlide === index ? classes.isActive : '')
                  }
                  style={{
                    transitionProperty: 'opacity, top',
                    transitionDuration: transitionDuration + 'ms',
                    transitionDelay: currentSlide === index ? transitionDuration + 'ms' : '0ms',
                  }}>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          <Slider {...settings} className={classes.teaser__list} ref={sliderRef}>
            {generatedTitle.map((item, index) => (
              <div key={index} className={classes.teaser__item}>
                <div
                  className={classes.tag}
                  style={{
                    opacity: getOpacity(currentSlide, index, slides.length, item),
                  }}>
                  {item.title}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className={classes.blockList__item}>
        <ReactPlayer url={videos[currentSlide]} width="100%" height="100%" />
      </div>
    </section>
  )
}
