import { IDefaultBlock } from 'shared/services/pageData/default/default.interface'
import React, { FC, useState } from 'react'
import AnimeSlider from 'shared/components/animeSlider/AnimeSlider'
import { IBlockSpeakers } from 'shared/services/pageData/main/main.interface'

interface IBlockAdvantagesProps {
  advantages: IDefaultBlock[]
  speakers: IBlockSpeakers
}

export const AdvantagesAndSpeakers: FC<IBlockAdvantagesProps> = ({ advantages, speakers }) => {
  let _sliderContent = [...speakers.speakers.data]

  if (_sliderContent.length < 5) {
    _sliderContent = [..._sliderContent, ..._sliderContent]
  }

  const slides = [
    ..._sliderContent.map(
      (slide) =>
        `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${slide.attributes.img?.data?.attributes.url}`
    ),
  ]

  const transitionDuration = 1000

  const [currentSlide, setCurrentSlide] = useState<number>(0)

  return (
    <section className="layout__section">
      <div className="block-list block-list_style_company">
        <div className="block-list__item">
          <div className="teaser-list teaser-list_col-3 teaser-list_mobile_dark">
            <div className="teaser-list__item teaser teaser_center-y_b teaser_style_company">
              <h2 className="teaser__h">14</h2>

              <div className="teaser__body">
                <div className="teaser__title">{advantages[0]?.title}</div>

                <div className="teaser__description">{advantages[0]?.text}</div>
              </div>
            </div>

            <div className="teaser-list__item teaser-list__item_tablet_hide"></div>

            <div className="teaser-list__item teaser teaser_style_dark teaser_center-y_b teaser_style_company">
              <h2 className="teaser__h">21</h2>

              <div className="teaser__body">
                <div className="teaser__title">{advantages[1]?.title}</div>

                <div className="teaser__description">{advantages[1]?.text}</div>
              </div>
            </div>

            <div className="teaser-list__item teaser-list__item_border_none teaser teaser_style_gray teaser_center-y_b teaser_style_company">
              <h2 className="teaser__h">16</h2>

              <div className="teaser__body">
                <div className="teaser__title">{advantages[2]?.title}</div>

                <div className="teaser__description">{advantages[2]?.text}</div>
              </div>
            </div>

            <div className="teaser-list__item teaser-list__item_tablet_hide"></div>

            <div className="teaser-list__item teaser-list__item_tablet-s_hide"></div>
          </div>

          <div className="background-list">
            <div className="background-list__item background-list_desktop_hide"></div>

            <div className="background-list__item background-list__item_2"></div>
          </div>
        </div>

        <div className="block-list__item">
          <AnimeSlider
            modifierClassesStyle={['slider_compact']}
            slides={slides}
            animationDuration={transitionDuration}
            delay={5000}
            emitCurrentSlide={(currentSlide) => setCurrentSlide(currentSlide)}
          />

          <div className="teaser-l teaser-l_compact">
            <h2 className="teaser-l__h">{speakers?.title}</h2>

            <div className="teaser-l__body-wrap">
              {_sliderContent?.map((slide, index) => (
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
                  <div
                    dangerouslySetInnerHTML={{ __html: slide.attributes.text }}
                    className="teaser-l__description teaser-l__description_stretched"></div>

                  <div className="teaser-l__footer">
                    <div className="teaser-l__note">{slide.attributes.sub_text}</div>

                    <div className="teaser-l__title">{slide.attributes.speaker_name}</div>
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
