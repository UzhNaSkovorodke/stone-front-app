import React, { FC, useEffect, useRef, useState } from 'react'
import classes from 'shared/components/AdvantagesProject/AdvantagesProject.module.scss'
import { generateOpacity } from 'shared/utils/GenerateOpacity'
import { useGenerateClasses } from 'shared/hooks/useGenerateClasses'
import { IDefaultSlide } from 'shared/services/pageData/default/default.interface'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.scss'

interface IGeneratedTitle {
  title: string
  opacity: number
}

interface IAdvantagesProjectProps {
  slider: IDefaultSlide[]
  title: string | null
  backgroundImage: string
  modifierClassesStyle?: string[]
}

export const AdvantagesProject: FC<IAdvantagesProjectProps> = ({
  slider,
  title,
  backgroundImage,
  modifierClassesStyle = [''],
}) => {
  slider = [...slider, ...slider, ...slider]
  const ListElementClasses: string = useGenerateClasses(classes, modifierClassesStyle)
  const slides: IDefaultSlide[] = slider
  const slidesTitles: string[] = slides.map((slide: IDefaultSlide) => slide.title)
  const sliderRef = useRef<Slider>(null)
  const transitionDuration = 500

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [generatedTitle, setGeneratedTitle] = useState<IGeneratedTitle[]>([])

  const chooseItem = (index: number): void => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    setGeneratedTitle(generateOpacity(slidesTitles, currentSlide))
  }, [currentSlide])

  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    swipeToSlide: true,
    focusOnSelect: true,
    beforeChange: (current: number, nextSlide: number) => {
      chooseItem(nextSlide)
      setCurrentSlide(nextSlide)
    },
    afterChange: (current: number) => {
      setCurrentSlide(current)
      chooseItem(current)
    },
  }

  return (
    <section className={`${classes.blockList} ${ListElementClasses}`}>
      <div
        className={classes.blockList__item}
        style={{ backgroundImage: 'url(' + `${backgroundImage}` + ')' }}
      />

      <div className={classes.blockList__item}>
        <div className={classes.teaser}>
          <div className={classes.teaser__header}>
            <div className={classes.teaser__title}>{title}</div>

            <Slider {...settings} className={classes.teaser__list} ref={sliderRef}>
              {generatedTitle.map((item, index) => (
                <div
                  className={[
                    classes.teaser__item,
                    index === currentSlide
                      ? ''
                      : index === currentSlide + 1
                      ? classes.teaser__item_secondvisible
                      : classes.teaser__item_unvisible,
                  ].join(' ')}
                  key={index}>
                  {item.title}
                </div>
              ))}
            </Slider>
          </div>

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
      </div>
    </section>
  )
}
