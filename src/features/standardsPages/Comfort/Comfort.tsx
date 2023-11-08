import classes from './Comfort.module.scss'
import { IDefaultSlide } from 'shared/services/pageData/default/default.interface'
import { IBlockSlider } from 'shared/services/pageData/standarts/standarts.interface'
import React, { FC, useState } from 'react'

interface IComfortProps {
  comfort: IBlockSlider
  backgroundImage: string
  modifierClassesStyle?: string[]
}

export const Comfort: FC<IComfortProps> = ({ comfort, backgroundImage }) => {
  const slides: IDefaultSlide[] = comfort.slider
  const slidesTitles: string[] = slides.map((slide: IDefaultSlide) => slide.title)

  const transitionDuration = 500

  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const chooseItem = (index: number): void => {
    setCurrentSlide(index)
  }
  return (
    <section className={classes.blockList}>
      <div
        className={classes.blockList__item}
        style={{ backgroundImage: 'url(' + `${backgroundImage}` + ')' }}></div>

      <div className={classes.blockList__item}>
        <div className={classes.teaser}>
          <div className={classes.teaser__header}>
            <div className={classes.teaser__title}>{comfort.title || ''}</div>

            <div className={classes.teaser__list}>
              {slidesTitles.map((item, index) => (
                <div
                  className={
                    classes.teaser__item + ' ' + (index === currentSlide ? classes.isActive : '')
                  }
                  key={index}
                  onClick={() => chooseItem(index)}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={classes.teaser__body}>
            {slides.map((item, index) => (
              <div
                key={item.id}
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
