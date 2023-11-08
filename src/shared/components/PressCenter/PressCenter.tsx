import DescriptionList from 'shared/components/descriptionList/DescriptionList'
import { INewsData } from 'shared/services/pageData/news/news.interface'
import { IconButton } from 'shared/uikit/IconButton'
import { convertDate } from 'shared/utils/ConvertDate'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Link from 'next/link'
import React, { FC, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.scss'

interface IPressCenterProps {
  news: INewsData[]
}

export const PressCenter: FC<IPressCenterProps> = ({ news }) => {
  const sliderRef = useRef() as any

  const slickSettings = {
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          draggable: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          draggable: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const touchStart = (direction: 'vertical' | 'right' | 'left'): void => {
    const isHorizontal = direction !== 'vertical'
    if (isHorizontal) {
      disableBodyScroll(sliderRef.current)
    }
  }

  const touchEnd = (): void => {
    enableBodyScroll(sliderRef.current)
  }

  return (
    <section className="layout__section section">
      <div className="section__header section__header_space-b">
        <h2 className="section__title">Пресс-центр</h2>

        <div className="section__buttons">
          <div className="items-list">
            <div className="items-list__item">
              <IconButton
                variant="blackFill"
                icon="arrowLongLeft"
                s="l"
                onClick={() => sliderRef.current.slickPrev()}
              />
            </div>

            <div className="items-list__item">
              <IconButton
                variant="blackFill"
                icon="arrowLongRight"
                s="l"
                onClick={() => sliderRef.current.slickNext()}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section__body section__body_offset" onTouchEnd={touchEnd}>
        <Slider
          className="cs-slick-slider"
          ref={sliderRef}
          {...slickSettings}
          swipeEvent={touchStart}>
          {news &&
            news.map((newsItem: INewsData) => (
              <div key={newsItem.id} className="cs-slick-slider__item">
                <Link
                  href={`/presscenter/${newsItem.attributes.slug}`}
                  target="_blank"
                  className="teaser-simple">
                  <div className="teaser-simple__title">{newsItem?.attributes.title}</div>

                  <div className="teaser-simple__note">
                    <DescriptionList value={['Компания', convertDate(newsItem?.attributes.date)]} />
                  </div>
                </Link>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  )
}
