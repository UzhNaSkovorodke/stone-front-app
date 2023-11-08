import React, { FC, useRef } from 'react'
import classes from 'src/features/standardsPages/SolutionStandards/SolutionStandards.module.scss'
import Image from 'next/image'
import { IconButton } from 'shared/uikit/IconButton'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.scss'
import { ETypeContent } from 'shared/types/typeContent.enum'
import { IBlockGallery } from 'shared/services/pageData/standarts/standarts.interface'
import { IDefaultImgData } from 'shared/services/pageData/default/default.interface'

interface ISolutionStandardsProps {
  gallery: IBlockGallery
  typeContent?: string
}

const slickSettings = {
  arrows: false,
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  draggable: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerMode: true,
        slidesToShow: 1,
      },
    },
  ],
}

export const SolutionStandards: FC<ISolutionStandardsProps> = ({
  gallery,
  typeContent = ETypeContent.DOM,
}) => {
  const clientWidth: number = useClientWidth()
  const isMobileView: boolean = clientWidth < 1024
  const mainSlides: string[] = gallery.gallery.imges?.data.map((image) => image.attributes.url)
  const mobileSlides: string[] = gallery.gallery.imagesSm?.data?.map(
    (image: IDefaultImgData) => image.attributes.url
  )

  const scrollToRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    window.scrollTo({
      top: scrollToRef.current?.clientHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div ref={scrollToRef} className={classes.section}>
      <div
        className={classes.section__title}
        dangerouslySetInnerHTML={{ __html: gallery.title || '' }}></div>

      <div className={classes.section__list}>
        <div
          className={`${classes.section__icon} ${
            typeContent === ETypeContent.OFFICE ? classes.section__icon_style_office : ''
          }`}>
          {typeContent === ETypeContent.DOM && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${gallery.logo_img.data?.attributes.url}`}
              height={isMobileView ? 89 : 114}
              width={isMobileView ? 120 : 150}
              alt="logo"
            />
          )}
          {typeContent === ETypeContent.OFFICE && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${gallery.logo_img.data?.attributes.url}`}
              height={29}
              width={135}
              alt="logo"
            />
          )}
        </div>

        {!isMobileView && (
          <div className={classes.tileList}>
            <div className={`${classes.tileList__col} ${classes.tileList__col_tablet_hide}`}>
              <Image
                quality={90}
                className={classes.tileList__item}
                width={0}
                height={246}
                sizes={'100vw'}
                src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${mainSlides[0]}`}
                alt="tower"
                priority={true}></Image>
            </div>

            <div className={classes.tileList__col}>
              <Image
                quality={90}
                className={classes.tileList__item}
                width={0}
                height={176}
                sizes={'100vw'}
                src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${mainSlides[1]}`}
                alt="tower"
                priority={true}></Image>
              <Image
                quality={90}
                className={classes.tileList__item}
                width={0}
                height={246}
                sizes={'100vw'}
                src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${mainSlides[2]}`}
                alt="tower"
                priority={true}></Image>
            </div>

            <div className={classes.tileList__col}>
              <Image
                quality={90}
                className={classes.tileList__item}
                width={0}
                height={526}
                sizes={'100vw'}
                src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${mainSlides[3]}`}
                alt="tower"
                priority={true}></Image>
            </div>

            <div className={classes.tileList__col}>
              <Image
                quality={90}
                className={classes.tileList__item}
                width={0}
                height={246}
                sizes={'100vw'}
                src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${mainSlides[4]}`}
                alt="tower"
                priority={true}></Image>
              <Image
                quality={90}
                className={classes.tileList__item}
                width={0}
                height={176}
                sizes={'100vw'}
                src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${mainSlides[5]}`}
                alt="tower"
                priority={true}></Image>
            </div>

            <div className={`${classes.tileList__col} ${classes.tileList__col_tablet_hide}`}>
              <Image
                quality={90}
                className={classes.tileList__item}
                width={0}
                height={246}
                sizes={'100vw'}
                src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${mainSlides[6]}`}
                alt="tower"
                priority={true}></Image>
            </div>
          </div>
        )}

        {isMobileView && (
          <Slider className={classes.slider} {...slickSettings}>
            {gallery.gallery.imagesSm &&
              mobileSlides.map((urlSlide, index) => (
                <div key={index} className={classes.slider__item}>
                  <Image
                    className={classes.tileList__item}
                    width={0}
                    height={486}
                    sizes={'100vw'}
                    src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${urlSlide}`}
                    alt="tower"
                    priority={true}></Image>
                </div>
              ))}
          </Slider>
        )}

        <div className={classes.section__button}>
          <IconButton onClick={() => scrollToBottom()} variant="blackFill" icon="arrowDown" />
        </div>
      </div>
    </div>
  )
}
