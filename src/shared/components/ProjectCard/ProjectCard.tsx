import { CSSProperties, FC, useRef, useState } from 'react'
import Link from 'next/link'
import classes from './styles.module.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.scss'
import Image from 'next/image'
import SaleStatus from '../saleStatus/SaleStatus'
import DescriptionList from '../descriptionList/DescriptionList'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import {
  IDefaultImgData,
  IDefaultProjectDataAttributes,
} from 'shared/services/pageData/default/default.interface'
import { useProjectTagsAndFeatures } from 'shared/hooks/useProjectTagsAndFeatures'
import { MetroIcon } from 'shared/components/MetroIcon'
import { IconButton } from 'shared/uikit/IconButton'

interface ISliderArrowProps {
  className?: string
  currentSlide?: number
  onClick?: () => void
  slideCount?: number
  style?: CSSProperties
  isRotate?: boolean
}

interface IProjectCardProps {
  projectAttributes: IDefaultProjectDataAttributes
  projectId: string
}

const SliderArrow = (props: ISliderArrowProps) => {
  return (
    <div className={`${classes[props.isRotate ? 'prev-arrow' : 'next-arrow']} ${classes['arrow']}`}>
      <IconButton
        onClick={props.onClick}
        icon={props.isRotate ? 'arrowLongLeft' : 'arrowLongRight'}
        variant="blackFill"></IconButton>
    </div>
  )
}

export const ProjectCard: FC<IProjectCardProps> = ({ projectAttributes, projectId }) => {
  const { tags, metroTag, projectFeatures } = useProjectTagsAndFeatures(projectAttributes)
  const images = projectAttributes.extraImg?.data?.map((image: IDefaultImgData) => image.attributes)

  const snippetRef = useRef<Slider | null>(null)
  const clientWidth = useClientWidth()
  const isSmallScreenView = clientWidth < 1024

  const snippetPlay = () => {
    !isSmallScreenView && snippetRef.current && snippetRef.current.slickPlay()
  }

  const snippetPause = () => {
    !isSmallScreenView && snippetRef.current && snippetRef.current.slickPause()
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderArrow />,
    prevArrow: <SliderArrow isRotate />,
    appendDots: (dots: any) => getSliderCounter(dots),
    afterChange: (number: number) => setCurrentSlide(number),
  }

  const [currentSlide, setCurrentSlide] = useState(0)

  const getSliderCounter = (dots: any) => {
    const totalSlides = dots.length

    return (
      <div>
        <div className={classes['slider-counter']}>
          {currentSlide + 1} из {totalSlides}
        </div>
      </div>
    )
  }

  const renderImages = () => {
    return (
      images &&
      images.map((img, index) => (
        <Image
          src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${img.url}`}
          width={img.width}
          height={isSmallScreenView ? 343 : 380}
          alt="Проект"
          key={index}
          className={classes['slider__image']}
          priority={true}
        />
      ))
    )
  }

  const renderTags = () => {
    if (isSmallScreenView) {
      return (
        <>
          <div className={classes['main__tags']}>
            {tags?.map((tag, index) => (
              <div className={classes['main__tag']} key={index}>
                {tag.withIcon && (
                  <div className={classes['main__tag-icon']}>
                    <MetroIcon s="medium" variant="white" color={metroTag?.color || ''} />
                  </div>
                )}
                {tag.title && <p className={classes['main__tag-title']}>{tag.title}</p>}
                {tag.description && (
                  <p className={classes['main__tag-description']}>{tag.description}</p>
                )}
              </div>
            ))}
          </div>
          <div className={classes['main__prices']}>
            {projectFeatures
              ?.filter((el) => el.attributes.category === 'directionPage')
              .map((feature, index) => (
                <p key={index} className={classes['main__price']}>
                  {feature.attributes.feature || ''}
                </p>
              ))}
          </div>
          <div className={classes['line']} />
          <div className={classes['main__tag_mobile']}>
            {metroTag && metroTag.withIcon && (
              <div className={classes['main__tag-icon']}>
                <MetroIcon s="medium" variant="white" color={metroTag?.color || ''} />
              </div>
            )}
            {metroTag && metroTag.title && (
              <p className={classes['main__tag-title']}>{metroTag.title}</p>
            )}
            {metroTag && metroTag.description && (
              <p className={classes['main__tag-description']}>{metroTag.description}</p>
            )}
          </div>
        </>
      )
    }

    return tags.concat(metroTag || []).map((tag, index) => (
      <div className={classes['main__tag']} key={index}>
        {tag.withIcon && (
          <div className={classes['main__tag-icon']}>
            <MetroIcon s="medium" variant="white" color={metroTag?.color || ''} />
          </div>
        )}
        {tag.title && <p className={classes['main__tag-title']}>{tag.title}</p>}
        {tag.description && <p className={classes['main__tag-description']}>{tag.description}</p>}
      </div>
    ))
  }

  return (
    <Link
      className={classes['block']}
      href={`${projectAttributes.type === 'dom' ? '/residential/' : '/commercial/'}${projectId}`}
      onMouseEnter={() => snippetPlay()}
      onMouseLeave={() => snippetPause()}>
      <Slider {...sliderSettings} ref={snippetRef} className={classes['slider']}>
        {renderImages()}
      </Slider>

      {isSmallScreenView ? (
        <div className={classes['main']}>
          <div className={classes['main__header']}>
            <SaleStatus
              value={projectAttributes.pstatus?.data?.attributes.title || ''}
              statusId={projectAttributes.pstatus?.data?.id}
            />
            <p
              className={`${classes['main__title']} ${classes['main__title_mobile']}`}
              dangerouslySetInnerHTML={{
                __html: projectAttributes.title || '',
              }}></p>
            <p className={classes['main__text']}>{projectAttributes.class}</p>
            {renderTags()}
          </div>
        </div>
      ) : (
        <div className={classes['main']}>
          <div className={classes['main__header']}>
            <div className={classes['main__header-block']}>
              <SaleStatus
                value={projectAttributes.pstatus.data?.attributes.title || ''}
                statusId={projectAttributes.pstatus.data?.id}
              />
              <p className={classes['main__text']}>{projectAttributes.class}</p>
            </div>

            <p
              className={classes['main__title']}
              dangerouslySetInnerHTML={{
                __html: projectAttributes.title || '',
              }}></p>

            <DescriptionList
              modifierClassesStyle={['list_style_wide']}
              value={projectFeatures
                .filter((el) => {
                  return el.attributes.category === 'directionPage'
                })
                .map((feature) => feature.attributes.feature || '')}
            />

            <div className={classes['main__tags']}>{renderTags()}</div>
          </div>

          <p className={classes['main__description']}>{projectAttributes.description}</p>
        </div>
      )}
    </Link>
  )
}
