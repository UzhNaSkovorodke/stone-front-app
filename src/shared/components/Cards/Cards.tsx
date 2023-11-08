import React, { FC, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.scss'
import styles from './Cards.module.scss'
import { CardsElement } from './CardsElement'
import { IBlockPromo } from 'shared/services/pageData/office/office.interface'

interface ICardsProps {
  cards: IBlockPromo[]
}

const slickSettings = {
  arrows: false,
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  draggable: false,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
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

export const Cards: FC<ICardsProps> = ({ cards }) => {
  const sliderRef = useRef() as any

  return (
    <div className={styles.list}>
      <Slider
        className="cs-slick-slider cs-slick-slider_space_none"
        ref={sliderRef}
        {...slickSettings}>
        {cards &&
          cards.map((item, index) => (
            <div key={index}>
              <CardsElement news={item} newsIndex={index} key={index} />
            </div>
          ))}
      </Slider>
    </div>
  )
}
