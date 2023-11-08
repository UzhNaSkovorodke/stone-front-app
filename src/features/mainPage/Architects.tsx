import React, { FC, useState } from 'react'
import AnimeSlider from 'shared/components/animeSlider/AnimeSlider'
import { IBlockArchitects } from 'shared/services/pageData/main/main.interface'

export const Architects: FC<IBlockArchitects> = ({ slider, title }) => {
  const slides = [
    ...slider?.map(
      (slide) => `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${slide.img?.data?.attributes?.url}`
    ),
  ]

  const transitionDuration = 1000

  const [currentSlide, setCurrentSlide] = useState<number>(0)

  return (
    <section className="layout__section">
      <div className="block-list block-list_style_slider">
        <div className="block-list__item">
          <AnimeSlider
            slides={slides}
            animationDuration={transitionDuration}
            delay={5000}
            emitCurrentSlide={(currentSlide) => setCurrentSlide(currentSlide)}
            modifierClassesStyle={['slider_style_shading']}
          />
        </div>

        <div className="block-list__item">
          <div className="teaser-l">
            <h2 className="teaser-l__h">{title}</h2>

            <div className="teaser-l__body-wrap">
              {slider.map((slide, index) => (
                <div
                  key={index}
                  className={
                    'teaser-l__body teaser-l__body_switchable teaser-l__body_col ' +
                    (currentSlide === index ? 'is-active' : '')
                  }
                  style={{
                    transitionProperty: 'opacity, top',
                    transitionDuration:
                      currentSlide === index
                        ? transitionDuration / 3 + 'ms'
                        : transitionDuration / 1.5 + 'ms',
                    transitionDelay:
                      currentSlide === index ? transitionDuration / 1.5 + 'ms' : '0ms',
                    transitionTimingFunction: 'ease-out',
                  }}>
                  <div className="teaser-l__description teaser-l__description_stretched">
                    {slide.text}
                  </div>

                  <div className="teaser-l__footer">
                    <div className="teaser-l__title">{slide.sub_text}</div>

                    <div className="teaser-l__note">{slide.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
