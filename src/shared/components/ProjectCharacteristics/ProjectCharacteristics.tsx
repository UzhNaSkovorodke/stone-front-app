import React, { FC, useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.scss'
import classes from './ProjectCharacteristics.module.scss'
import { ListElement } from './ListElement'
import { IconButton } from 'shared/uikit/IconButton'
import { IDefaultSlide } from 'shared/services/pageData/default/default.interface'

const slider1Settings = {
  speed: 800,
  arrows: false,
  infinite: true,
  fade: true,
}

const slider2Settings = {
  speed: 800,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  swipeToSlide: true,
  focusOnSelect: true,
  arrows: false,
  infinite: true,
  fade: false,
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1279,
      settings: {
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

interface ICharacteristics {
  title: string
  note: string
  pic: string
}

interface IProjectCharacteristicsProps {
  projectCharacteristics: IDefaultSlide[]
  type?: string
}

export const ProjectCharacteristics: FC<IProjectCharacteristicsProps> = ({
  projectCharacteristics,
  type,
}) => {
  let characteristics: ICharacteristics[] = projectCharacteristics.map((slide: IDefaultSlide) => ({
    title: slide.title,
    note: slide.text,
    pic: `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${slide?.img?.data?.attributes?.url}`,
  }))

  const [selectedIndex, setSelectedIndex] = useState<string>('0')

  const setIndex = (index: number) => {
    setSelectedIndex(index.toString())
  }

  const duplicateData = (projectsCharacteristics: ICharacteristics[]): ICharacteristics[] => {
    if (projectsCharacteristics.length < 8) {
      return [...projectsCharacteristics, ...projectsCharacteristics]
    } else {
      return [...projectsCharacteristics]
    }
  }

  characteristics = [...duplicateData([...characteristics])]

  const [nav1, setNav1] = useState()
  const [nav2, setNav2] = useState()
  const slider1 = useRef() as any //TODO: apanarin временно any, пока не получилось строго типизировать, вернуться к вопросу с появлением времени
  const slider2 = useRef() as any //TODO: apanarin временно any, пока не получилось строго типизировать, вернуться к вопросу с появлением времени

  useEffect(() => {
    setNav1(slider1.current)
    setNav2(slider2.current)
  }, [])

  const ImageComponent = (imgSrc: string) => (
    <div className={classes.picture}>
      <Image
        src={imgSrc}
        quality={100}
        fill
        style={{
          objectFit: 'cover',
        }}
        alt="Характеристики проекта"
        priority={true}
      />
      <div className={classes.picture__button + ' ' + classes.picture__button_left}>
        <IconButton
          variant="blackFill"
          icon="arrowLongLeft"
          s="l"
          onClick={() => slider1.current.slickPrev()}
        />
      </div>
      <div className={classes.picture__button + ' ' + classes.picture__button_right}>
        <IconButton
          variant="blackFill"
          icon="arrowLongRight"
          s="l"
          onClick={() => slider1.current.slickNext()}
        />
      </div>
    </div>
  )

  return (
    <>
      <Slider asNavFor={nav2} ref={slider1} className={classes.slider} {...slider1Settings}>
        {characteristics &&
          characteristics.map((item: ICharacteristics, index: number) => (
            <div key={index}>{ImageComponent(item.pic)}</div>
          ))}
      </Slider>
      <Slider
        className="cs-slick-slider cs-slick-slider_space_none"
        asNavFor={nav1}
        ref={slider2}
        afterChange={setIndex}
        {...slider2Settings}>
        {characteristics &&
          characteristics.map((item: ICharacteristics, index: number) => (
            <ListElement
              item={item}
              selectedIndex={+selectedIndex}
              index={index}
              key={index}
              modifierClassesStyle={type === 'dom' ? ['list_style_dom'] : ['']}
            />
          ))}
      </Slider>
    </>
  )
}
