import { CSSProperties, FC, useEffect, useRef, useState } from 'react'
// @ts-ignore
import { useYMaps } from '@pbe/react-yandex-maps'
import classes from './styles.module.scss'
import Slider from 'react-slick'
import Image from 'next/image'
import SaleStatus from '../../saleStatus/SaleStatus'
import DescriptionList from '../../descriptionList/DescriptionList'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import { CloseButton } from 'shared/uikit/closeButton/CloseButton'
import Link from 'next/link'
import {
  IDefaultImgData,
  IDefaultMetro,
  IDefaultProjectData,
  IDefaultProjectDataAttributesFeaturesData,
} from 'shared/services/pageData/default/default.interface'
import { ITag } from 'shared/hooks/useProjectTagsAndFeatures'
import { createTagsFromProjectFeatures } from 'shared/utils/mapping'
import { MetroIcon } from 'shared/components/MetroIcon'
import { Icon } from 'shared/uikit/Icon'
import { IconButton } from 'shared/uikit/IconButton'

interface ISliderArrowProps {
  className?: string
  currentSlide?: number
  onClick?: () => void
  slideCount?: number
  style?: CSSProperties
  isRotate?: boolean
}

const SliderArrow = (props: ISliderArrowProps) => {
  return (
    <div className={`${classes[props.isRotate ? 'prev-arrow' : 'next-arrow']} ${classes['arrow']}`}>
      <IconButton
        onClick={props.onClick}
        variant="blackFill"
        icon={props.isRotate ? 'arrowLongLeft' : 'arrowLongRight'}></IconButton>
    </div>
  )
}

interface IPin {
  id: number
  coordinates: number[]
  color: string
  title: string
  modal: IModalPin
}

interface IModalPin {
  title: string
  class: string
  tags: ITag[]
  metroTag: ITag | null
  features: IDefaultProjectDataAttributesFeaturesData[]
  projectStatus: { id: number; title: string }
  images: string[]
  coordinates: number[]
}

interface IProjectPresentationMapProps {
  projects: IDefaultProjectData[]
  onCloseMap: () => void
}

const ProjectsPresentationMap: FC<IProjectPresentationMapProps> = ({ onCloseMap, projects }) => {
  const moscowCenterCoordinates = [55.755863, 37.6177]
  const clientWidth = useClientWidth()
  const isSmallScreenView = clientWidth < 1440
  const isMobileView = clientWidth <= 767

  const getSliderCounter = (dots: any) => {
    const totalSlides = dots.length

    return (
      <div>
        <div className={classes['modal-slider__counter']}>
          {currentSlide + 1} из {totalSlides}
        </div>
      </div>
    )
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderArrow />,
    prevArrow: <SliderArrow isRotate />,
    appendDots: (dots: any) => getSliderCounter(dots),
    afterChange: (number: number) => setCurrentSlide(number),
  }

  const maxZoom = 18
  const minZoom = 12
  const defaultZoom = 12

  const [map, setMap] = useState<any>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalOPenState, setModalOPenState] = useState('full')
  const [modalInfo, setModalInfo] = useState<IModalPin | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentMapZoom, setCurrentMapZoom] = useState<number>(defaultZoom)
  const [geoProjectsLink, setGeoProjectsLink] = useState<any>(null)
  const detalizedZoomRange = currentMapZoom >= 14

  const mapRef = useRef(null)
  const ymaps = useYMaps(['Map', 'Placemark', 'templateLayoutFactory', 'GeoObjectCollection'])

  const mapProjectsToPins = (): IPin[] => {
    return projects.map((project: IDefaultProjectData) => {
      const tags: ITag[] = createTagsFromProjectFeatures(project.attributes)
      const metroTag: ITag | null = project.attributes.metro
        ? {
            title: project.attributes.metro.map((elem: IDefaultMetro) => elem.station).join(', '),
            description: project.attributes.metro
              .map((elem: IDefaultMetro) => elem.time_from + ' мин')
              .join(', '),
            withIcon: true,
            color: project.attributes.metro.map((metro: IDefaultMetro) => metro.color),
          }
        : null

      const projectFeatures: IDefaultProjectDataAttributesFeaturesData[] =
        project.attributes.features.data.filter(
          (feature: IDefaultProjectDataAttributesFeaturesData) => !feature.attributes.tag || false
        )

      const pinCoordinates = [
        Number(project.attributes.geo?.lat || 0),
        Number(project.attributes.geo?.long) || 0,
      ]
      const projectPin: IPin = {
        id: project.id,
        color: project.attributes.pstatus.data.attributes.color || '',
        coordinates: pinCoordinates,
        title: project.attributes.title || '',
        modal: {
          title: project.attributes.title || '',
          class: project.attributes.class || '',
          features: projectFeatures,
          projectStatus: {
            id: project.attributes.pstatus.data?.id || 0,
            title: project.attributes.pstatus.data?.attributes.title || '',
          },
          images: project.attributes.extraImg.data?.map(
            (img: IDefaultImgData) =>
              `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${img.attributes.url}`
          ),
          metroTag,
          tags,
          coordinates: pinCoordinates,
        },
      }

      return projectPin
    })
  }

  const projectsPins: IPin[] = mapProjectsToPins()

  // Map init
  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return
    }

    const ymap = new ymaps.Map(
      mapRef.current,
      {
        center: moscowCenterCoordinates,
        zoom: defaultZoom,
      },
      {
        maxZoom,
        minZoom,
        suppressMapOpenBlock: true,
        copyrightLogoVisible: false,
        copyrightProvidersVisible: false,
        copyrightUaVisible: false,
      }
    )

    if (!map) setMap(ymap)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ymaps])

  useEffect(() => {
    if (!map) return

    map.events.add('wheel', (x: any) => {
      if (x._sourceEvent._sourceEvent.originalEvent.deltaY > 0) {
        setCurrentMapZoom(map.getZoom() - 1)
      } else {
        setCurrentMapZoom(map.getZoom() + 1)
      }
    })
  }, [map])

  const getDetalizedIconLayout = (pin: any) => {
    return ymaps?.templateLayoutFactory?.createClass(
      `<div id='${pin.id}' style='border: 1px solid ${pin.color}' class='${classes['map__pin']}'><p class='${classes['map__pin-title']}'>${pin.title}</p><div style='outline: 1px solid ${pin.color};border: 3px solid #FFF;background-color: ${pin.color}' class='${classes['map__pin-circle_small']}'></div></div>`
    )
  }

  const getIconLayout = (pin: any) => {
    return ymaps?.templateLayoutFactory?.createClass(
      `<div id='${pin.id}' style='outline: 1px solid ${pin.color};border: 3px solid #FFF;background-color: ${pin.color}' class='${classes['map__pin-circle_large']}'></div>`
    )
  }

  const getPlacemark = (
    pin: any,
    iconLayout: ymaps.IClassConstructor<ymaps.layout.templateBased.Base> | undefined
  ) => {
    if (!ymaps) return

    const averageLetterWidth = 9
    // calculated pin width
    const iconWidth = (pin?.title.length ? pin?.title.length : 25) * averageLetterWidth + 30
    const iconShapeCoordinates = detalizedZoomRange
      ? [
          [iconWidth, 50],
          [0, 0],
        ]
      : [
          [10, 10],
          [-5, -12],
        ]

    return new ymaps.Placemark(
      pin.coordinates,
      {},
      {
        iconLayout,
        iconOffset: detalizedZoomRange ? [-iconWidth / 2, -42] : undefined,
        iconShape: {
          type: 'Rectangle',
          //@ts-ignore
          coordinates: iconShapeCoordinates,
        },
      }
    )
  }

  const handleFillingGeoCollection = () => {
    projectsPins.map((pin) => {
      const placemark = getPlacemark(
        pin,
        detalizedZoomRange ? getDetalizedIconLayout(pin) : getIconLayout(pin)
      )

      if (detalizedZoomRange) {
        placemark?.events.add('click', () => handleOpenModal(pin.modal))
      } else {
        placemark?.events.add('click', () => {
          handleOpenModal(pin.modal)
          setCurrentMapZoom(14)
          map.setZoom(14)
          map.setCenter(pin.coordinates)
        })
      }

      geoProjectsLink.add(placemark)
    })
  }

  // Geo object collections init
  useEffect(() => {
    if (!ymaps) return

    if (!geoProjectsLink) setGeoProjectsLink(new ymaps.GeoObjectCollection({}, {}))
  }, [ymaps, geoProjectsLink])

  // Geo objects map init
  useEffect(() => {
    if (!map || !ymaps || !mapRef.current) return

    if (geoProjectsLink) {
      geoProjectsLink?.removeAll()
      handleFillingGeoCollection()
      map.geoObjects.add(geoProjectsLink)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, ymaps, projects, geoProjectsLink, currentMapZoom])

  const handleChangeZoomPlus = () => {
    map.setZoom(map.getZoom() + 1, { checkZoomRange: true })
    setCurrentMapZoom(map.getZoom() + 1)
  }

  const handleChangeZoomMinus = () => {
    map.setZoom(map.getZoom() - 1, { checkZoomRange: true })
    setCurrentMapZoom(map.getZoom() - 1)
  }

  const handleOpenModal = (info: IModalPin) => {
    setModalOPenState('full')
    setModalInfo(info)
    setIsOpenModal(true)
    setCurrentSlide(0)
  }
  const handleCloseModal = () => {
    setModalInfo(null)
    setIsOpenModal(false)
  }

  const renderZoomButtons = () => {
    return (
      <div
        className={classes['zoom__container']}
        style={{ zIndex: `${modalOPenState === 'half' ? '5' : '1'}` }}>
        <div className={classes['zoom__button']} onClick={handleChangeZoomPlus}>
          <Icon name="plus" />
        </div>
        <div className={classes['zoom__button']} onClick={handleChangeZoomMinus}>
          <Icon name="minus" />
        </div>
      </div>
    )
  }

  const renderSliderImages = (images: string[]) => {
    return images.map((img, index) => (
      <Image
        src={img}
        width={isSmallScreenView ? 343 : 464}
        height={isSmallScreenView ? 343 : isMobileView ? 464 : 464}
        alt="Проект"
        key={index}
        className={classes['modal-slider__image']}
        priority={true}
      />
    ))
  }

  const renderTags = (
    tags: ITag[],
    metroTag: ITag | null,
    features: IDefaultProjectDataAttributesFeaturesData[]
  ) => {
    if (isSmallScreenView) {
      return (
        <div>
          <div className={classes['modal-main__tags']}>
            {tags?.map((tag, index) => (
              <div className={classes['modal-main__tag']} key={index}>
                {tag.withIcon && (
                  <div className={classes['modal-main__tag-icon']}>
                    <MetroIcon s="large" variant="white" color={metroTag?.color || ''} />
                  </div>
                )}
                {tag.title && <p className={classes['modal-main__tag-title']}>{tag.title}</p>}
                {tag.description && (
                  <p className={classes['modal-main__tag-description']}>{tag.description}</p>
                )}
              </div>
            ))}
          </div>
          <div className={classes['modal-main__prices']}>
            {features.map((feature, index) => (
              <p key={index} className={classes['modal-main__price']}>
                {feature.attributes.feature}
              </p>
            ))}
          </div>
          <hr className={classes['line']} />
          <div className={classes['modal-main__tag_mobile']}>
            {metroTag && metroTag.withIcon && (
              <div className={classes['modal-main__tag-icon']}>
                <MetroIcon s="medium" variant="white" color={metroTag?.color || ''} />
              </div>
            )}
            {metroTag && metroTag.title && (
              <p className={classes['modal-main__tag-title']}>{metroTag.title}</p>
            )}
            {metroTag && metroTag.description && (
              <p className={classes['modal-main__tag-description']}>{metroTag.description}</p>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className={classes['modal-main__tags']}>
        {tags.concat(metroTag || []).map((tag, index) => (
          <div className={classes['modal-main__tag']} key={index}>
            {tag.withIcon && (
              <div className={classes['modal-main__tag-icon']}>
                <MetroIcon s="medium" variant="white" color={metroTag?.color || ''} />
              </div>
            )}
            {tag.title && <p className={classes['modal-main__tag-title']}>{tag.title}</p>}
            {tag.description && (
              <p className={classes['modal-main__tag-description']}>{tag.description}</p>
            )}
          </div>
        ))}{' '}
      </div>
    )
  }

  const handleSwipe = () => {
    if (modalOPenState === 'full') setModalOPenState('half')

    if (modalOPenState === 'half') handleCloseModal()
  }

  const renderModal = () => {
    if (!modalInfo) return

    if (isMobileView) {
      const coordinates = modalInfo?.coordinates
      const lat = coordinates[0]
      const long = coordinates[1]
      const routeRef = `https://yandex.ru/maps/213/moscow/?ll=${long}%2C${lat}&mode=routes&rtext=~${lat}%2C${long}&rtt=auto&ruri=~&z=10`

      return (
        <div
          className={classes['modal-mobile']}
          style={{ height: `${modalOPenState === 'half' ? '514px' : '100vh'}` }}>
          <Link href={routeRef} className={classes['route-button']} target="blank">
            <p className={classes['route-button__title']}>Маршрут</p>
            <Icon name="route" />
          </Link>
          <div className={classes['modal-mobile__container']}>
            <div className={classes['swipe-zone']} onClick={handleSwipe}>
              <div className={classes['swipe-zone__container']}></div>
              <div className={classes['ellipse']} />
            </div>
            <div className={classes['modal']}>
              <div className={classes['modal-container']}>
                <Slider {...sliderSettings} className={classes['modal-slider']}>
                  {renderSliderImages(modalInfo.images)}
                </Slider>

                <div className={classes['modal-main']}>
                  <div className={classes['modal-main__header']}>
                    <SaleStatus
                      value={modalInfo.projectStatus.title}
                      statusId={modalInfo.projectStatus.id}
                    />
                    <p
                      className={`${classes['modal-main__title']} ${classes['modal-main__title_mobile']}`}>
                      {modalInfo.title}
                    </p>
                    <p className={classes['modal-main__text']}>{modalInfo.class}</p>
                    {renderTags(
                      modalInfo.tags,
                      modalInfo.metroTag,
                      modalInfo.features.filter((f) => f.attributes.category === 'directionPage')
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={classes['modal']}>
        <div className={classes['modal-container']}>
          <div className={classes['close-button']}>
            <CloseButton onClick={handleCloseModal} />
          </div>
          <Slider {...sliderSettings} className={classes['modal-slider']}>
            {renderSliderImages(modalInfo.images)}
          </Slider>

          {isSmallScreenView ? (
            <div className={classes['modal-main']}>
              <div className={classes['modal-main__header']}>
                <SaleStatus
                  value={modalInfo.projectStatus.title}
                  statusId={modalInfo.projectStatus.id}
                />
                <p
                  className={`${classes['modal-main__title']} ${classes['modal-main__title_mobile']}`}>
                  {modalInfo.title}
                </p>
                <p className={classes['modal-main__text']}>{modalInfo.class}</p>
                {renderTags(
                  modalInfo.tags,
                  modalInfo.metroTag,
                  modalInfo.features.filter((f) => f.attributes.category === 'directionPage')
                )}
              </div>
            </div>
          ) : (
            <div className={classes['modal-main']}>
              <div className={classes['modal-main__header']}>
                <div className={classes['modal-main__header-block']}>
                  <SaleStatus
                    value={modalInfo.projectStatus.title}
                    statusId={modalInfo.projectStatus.id}
                  />
                  <p className={classes['modal-main__text']}>{modalInfo.class}</p>
                </div>

                <p className={classes['modal-main__title']}>{modalInfo.title}</p>

                {!isSmallScreenView && (
                  <DescriptionList
                    value={modalInfo.features
                      .filter((f) => f.attributes.category === 'directionPage')
                      .map((feature) => feature.attributes.feature || '')}
                    modifierClassesStyle={['mapFeatures']}
                  />
                )}

                {renderTags(
                  (modalInfo.tags = []),
                  modalInfo.metroTag,
                  modalInfo.features.filter((f) => f.attributes.category === 'directionPage')
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={classes['map-container']}>
      {isMobileView && (
        <div className={classes['map__close-button']}>
          <CloseButton onClick={onCloseMap} />
        </div>
      )}
      <div ref={mapRef} className={classes['map']}>
        {renderZoomButtons()}
      </div>
      {isOpenModal && renderModal()}
    </div>
  )
}

export default ProjectsPresentationMap
