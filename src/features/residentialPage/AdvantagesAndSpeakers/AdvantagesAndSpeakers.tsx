import React, { FC, useState } from 'react'
import AnimeSlider from 'shared/components/animeSlider/AnimeSlider'
import classes from 'src/features/residentialPage/AdvantagesAndSpeakers/AdvantagesAndSpeakers.module.scss'
import {
  IResidentialBlockAdvantages,
  IResidentialBlockSpeakers,
} from 'shared/services/pageData/dom/dom.interface'

interface IBlockAdvantagesProps {
  advantages: IResidentialBlockAdvantages
  speakers: IResidentialBlockSpeakers
}

export const AdvantagesAndSpeakers: FC<IBlockAdvantagesProps> = ({ advantages, speakers }) => {
  let _sliderContent = [...speakers?.speakers.data]

  if (_sliderContent.length < 5) {
    _sliderContent = [..._sliderContent, ..._sliderContent]
  }

  const slides = [
    ..._sliderContent?.map(
      (slide) =>
        `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${slide.attributes.img?.data?.attributes.url}`
    ),
  ]

  const transitionDuration = 1000

  const [currentSlide, setCurrentSlide] = useState<number>(0)

  return (
    <section className={classes.blockList}>
      <div className={classes.blockList__item}>
        <div className={classes.teaserList}>
          <div
            className={classes.teaserList__item + ' ' + classes.teaserList__item_tablet_hide}></div>

          <div
            className={classes.teaserList__item + ' ' + classes.teaserList__item_tablet_hide}></div>

          <div className={classes.teaserList__item + ' ' + classes.teaser + ' ' + classes.teaser_1}>
            <h2
              className={classes.teaser__h}
              dangerouslySetInnerHTML={{ __html: advantages.slider[0]?.title }}
            />

            <div className={classes.teaser__body}>
              <div
                className={classes.teaser__title}
                dangerouslySetInnerHTML={{ __html: advantages.slider[0]?.text }}
              />

              <div
                className={classes.teaser__description}
                dangerouslySetInnerHTML={{
                  __html: advantages.slider[0]?.sub_text,
                }}
              />
            </div>
          </div>

          <div className={classes.teaserList__item + ' ' + classes.teaser + ' ' + classes.teaser_2}>
            <h2
              className={classes.teaser__h}
              dangerouslySetInnerHTML={{ __html: advantages.slider[1]?.title }}
            />

            <div className={classes.teaser__body}>
              <div
                className={classes.teaser__title}
                dangerouslySetInnerHTML={{ __html: advantages.slider[1]?.text }}
              />
              <div
                className={classes.teaser__description}
                dangerouslySetInnerHTML={{
                  __html: advantages.slider[1]?.sub_text,
                }}
              />
            </div>
          </div>

          <div
            className={classes.teaserList__item + ' ' + classes.teaserList__item_tablet_hide}></div>

          <div
            className={
              classes.teaserList__item +
              ' ' +
              classes.teaserList__item_border_none +
              ' ' +
              classes.teaser +
              ' ' +
              classes.teaser_3
            }>
            <h2
              className={classes.teaser__h}
              dangerouslySetInnerHTML={{ __html: advantages.slider[2]?.title }}
            />

            <div className={classes.teaser__body}>
              <div
                className={classes.teaser__title}
                dangerouslySetInnerHTML={{ __html: advantages.slider[2]?.text }}
              />

              <div
                className={classes.teaser__description}
                dangerouslySetInnerHTML={{
                  __html: advantages.slider[2]?.sub_text,
                }}
              />
            </div>
          </div>
        </div>

        <div className={classes.backgroundList}>
          <div className={classes.backgroundList__item}></div>

          <div className={classes.backgroundList__item}></div>
        </div>
      </div>

      <div className={classes.blockList__item}>
        <AnimeSlider
          modifierClassesStyle={['slider_compact']}
          slides={slides}
          animationDuration={transitionDuration}
          delay={5000}
          emitCurrentSlide={(currentSlide) => setCurrentSlide(currentSlide)}
        />

        <div className={classes.teaserL}>
          <h2 className={classes.teaserL__h}>{speakers?.title}</h2>

          <div className={classes.teaserL__bodyWrap}>
            {_sliderContent?.map((slide, index) => (
              <div
                key={index}
                className={
                  classes.teaserL__body + ' ' + (currentSlide === index ? classes.isActive : '')
                }
                style={{
                  transitionProperty: 'opacity, top',
                  transitionDuration:
                    currentSlide === index
                      ? transitionDuration / 3 + 'ms'
                      : transitionDuration / 1.5 + 'ms',
                  transitionDelay: currentSlide === index ? transitionDuration / 1.5 + 'ms' : '0ms',
                  transitionTimingFunction: 'ease-out',
                }}>
                <div
                  dangerouslySetInnerHTML={{ __html: slide.attributes.text }}
                  className={classes.teaserL__description}></div>

                <div className={classes.teaserL__footer}>
                  <div
                    className={classes.teaserL__note}
                    dangerouslySetInnerHTML={{
                      __html: slide.attributes.sub_text,
                    }}
                  />

                  <div
                    className={classes.teaserL__title}
                    dangerouslySetInnerHTML={{
                      __html: slide.attributes.speaker_name,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
