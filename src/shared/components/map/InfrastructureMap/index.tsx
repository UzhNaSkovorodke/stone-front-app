import { FC, useEffect, useRef, useState, Dispatch, SetStateAction } from 'react'
import { useYMaps } from '@pbe/react-yandex-maps'
import moscow_city from '/public/image/moscow_city.png'
import white_square from '../../../../../public/image/white_square.png'
import food_pin from '/public/image/food_pin.png'
import basketball_pin from '/public/image/basketball_pin.png'
import brightness_up_pin from '/public/image/brightness_up_pin.png'
import building_pin from '/public/image/building_pin.png'
import briefcase_pin from '/public/image/briefcase_pin.png'
import classes from './styles.module.scss'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import Image from 'next/image'
import { IDefaultGeo, IDefaultProject } from 'shared/services/pageData/default/default.interface'
import { IPointTypesResponse } from 'shared/services/pageData/pointTypes/pointTypes.interface'
import { useLegendPoints } from 'shared/hooks/useLegendPoints'
import { Icon } from 'shared/uikit/Icon'

enum LegendTabs {
  INFRASTRUCTURE = 'infrastructure',
  PLAN = 'plan',
}

export interface ILegendModalElement {
  title: string
  icon: string
  isChecked: boolean
  handleCheck: Dispatch<SetStateAction<boolean>>
}

export interface ILegendPin {
  coordinates: number[]
  text: string | null
}

interface IInfrastructureMapProps {
  project: IDefaultProject
  pointTypes: IPointTypesResponse
}

const InfrastructureMap: FC<IInfrastructureMapProps> = ({ project, pointTypes }) => {
  const geoProject: IDefaultGeo = project.data?.attributes.geo
  const projectsPins = [
    {
      id: 1,
      coordinates: [geoProject.lat || '0', geoProject.long || '0'],
      img: `${project.data?.attributes.pinImg?.data?.attributes.url}`,
      width: 105,
      height: 149,
      text: project.data?.attributes.title || '',
      main: true,
    },
    {
      id: 2,
      coordinates: [55.747681, 37.540127],
      img: `${moscow_city.src}`,
      width: 61,
      height: 87,
      text: 'Москва-Сити',
      main: false,
    },
    {
      id: 3,
      coordinates: [55.777808, 37.5869],
      img: `${white_square.src}`,
      width: 61,
      height: 87,
      main: false,
      text: 'Белая Площадь',
    },
  ]

  const clientWidth = useClientWidth()
  const isMobileView = clientWidth <= 1024
  const isDesktopView = clientWidth >= 1440
  const maxZoom = 16
  const minZoom = 13
  const defaultZoom = 15

  const [dataHoverInfrastructurePlacemark, setDataHoverInfrastructurePlacemark] =
    useState<any>(null)
  const [dataHoverProjectPlacemark, setDataHoverProjectPlacemark] = useState<any>(null)
  const [currentMapZoom, setCurrentMapZoom] = useState<number>(defaultZoom)
  const [activeLegendTab, setActiveLegendTab] = useState<LegendTabs>(LegendTabs.INFRASTRUCTURE)
  const [geoProjectsLink, setGeoProjectsLink] = useState<any>(null)
  const [geoComplexLink, setGeoComplexLink] = useState<any>(null)
  const [geoParksLink, setGeoParksLink] = useState<any>(null)
  const [geoCafeLink, setGeoCafeLink] = useState<any>(null)
  const [geoSportLink, setGeoSportLink] = useState<any>(null)
  const [geoEnvironmentLink, setGeoEnvironmentLink] = useState<any>(null)
  const [geoHoverInfrastructurePlacemarkLink, setGeoHoverInfrastructurePlacemarkLink] =
    useState<any>(null)
  const [geoHoverProjectPlacemarkLink, setGeoHoverProjectPlacemarkLink] = useState<any>(null)
  const [isOpenedModal, setIsOpenedModal] = useState(false)
  const [activePin, setActivePin] = useState<string>('')

  const { state, variables, pins } = useLegendPoints(pointTypes, project.data?.attributes.pois)

  const [map, setMap] = useState<any>(null)
  const mapRef = useRef(null)
  const ymaps = useYMaps([
    'Map',
    'Placemark',
    'Circle',
    'templateLayoutFactory',
    'GeoObjectCollection',
    'coordSystem.geo',
  ])

  // Map init
  useEffect(() => {
    if (!ymaps || !mapRef.current) return

    if (!mapRef.current) return

    const ymap = new ymaps.Map(
      mapRef.current,
      {
        center: [Number(geoProject.lat || 0), Number(geoProject.long || 0)],
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
    isDesktopView ? setIsOpenedModal(true) : setIsOpenedModal(false)
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

  const getProjectPlacemark = (pin: any) => {
    if (!ymaps) return

    const getIconLayout = (pin: any) => {
      return ymaps?.templateLayoutFactory?.createClass(
        `<img alt="иконка на карте" ${
          pin.main ? `class=${classes['placemark-icon-layout_project']}` : ''
        } src=${pin.main ? process.env.NEXT_PUBLIC_STONE_CMS_API_URL : ''}${
          pin.img
        } style='height: ${pin.height}px;width: ${
          pin.width
        }px;max-width: unset;max-height: unset' />`
      )
    }

    return new ymaps.Placemark(
      pin.coordinates,
      {
        iden: pin.id,
      },
      {
        zIndex: 3, //иконка проекта
        iconLayout: getIconLayout(pin),
        // Shifting the position of the picture to the center
        iconOffset: [-pin.width / 2, -pin.height / 2],
        iconShape: {
          type: 'Rectangle',
          //@ts-ignore
          coordinates: [
            [pin.width, pin.height],
            [0, 0],
          ],
        },
      }
    )
  }

  const getInfrastructurePlacemark = (pin: any, icon: string) => {
    if (!ymaps) return

    return new ymaps.Placemark(
      pin.coordinates,
      {
        iden: pin.text,
      },
      {
        zIndex: activePin === pin.text ? 10 : 1, //иконка пина, активная перекрывает лейбл, остальные по дефолту перекрываются лейблами
        iconLayout: 'default#image',
        iconImageHref: icon,
        iconImageSize: [40, 40],
        iconImageOffset: [-10, -10],
        iconShape: {
          type: 'Rectangle',
          //@ts-ignore
          coordinates: [
            [20, 20],
            [0, 0],
          ],
        },
      }
    )
  }

  const getHoverInfrastructurePlacemark = (pin: any) => {
    {
      isMobileView && setActivePin(pin.text)
    }

    if (!ymaps) return

    const getIconLayout = () => {
      return ymaps?.templateLayoutFactory?.createClass(
        `<div class=${classes['hover-infrastructure-placemark']}>${pin.text}</div>`
      )
    }

    return new ymaps.Placemark(
      pin.coordinates,
      {},
      {
        zIndex: 4,
        iconLayout: getIconLayout(),
        iconOffset: [-10, -15],
        syncOverlayInit: true,
      }
    )
  }

  const getHoverProjectPlacemark = (pin: any) => {
    const main = pin?.main
    const averageLetterWidth = 7
    // calculated pin width
    const iconWidth = (pin?.text?.length ? pin?.text?.length : 25) * averageLetterWidth + 30
    const iconOffset = main
      ? [-iconWidth / 2, pin.height / 2 - 7]
      : [-iconWidth / 2, pin.height / 2 - 14]

    if (!ymaps) return

    const getIconLayout = () => {
      return ymaps?.templateLayoutFactory?.createClass(
        `<div class=${classes['hover-project-placemark']}>${pin.text}</div>`
      )
    }

    return new ymaps.Placemark(
      pin.coordinates,
      {},
      {
        zIndex: 2,
        iconLayout: getIconLayout(),
        iconOffset,
      }
    )
  }

  const getDistanceInfoPlacemark = (coordinates: number[]) => {
    if (!ymaps) return

    const getIconLayout = () => {
      return ymaps?.templateLayoutFactory?.createClass(
        `<div class=${classes['placemark-icon-layout_distance-info']}>800 м</div>`
      )
    }

    const startPoint = coordinates
    const azimuth = Math.PI
    const direction = [Math.cos(azimuth), Math.sin(azimuth)]

    //@ts-ignore
    const correctCoordinates = ymaps.coordSystem.geo.solveDirectProblem(
      startPoint,
      direction,
      795
    ).endPoint

    return new ymaps.Placemark(
      correctCoordinates,
      {},
      {
        zIndex: 2,
        iconLayout: getIconLayout(),
        iconOffset: [-12, -12],
      }
    )
  }

  const getCircle = (coordinates: number[]) => {
    if (!ymaps) return

    return new ymaps.Circle(
      [coordinates, 800],
      {},
      {
        fillColor: '#1C3040',
        fillOpacity: 0.1,
        strokeColor: '#1C3040',
        strokeOpacity: 0.4,
        strokeWidth: 1,
      }
    )
  }

  const handleFillingGeoCollection = (geoLink: any, pins: any[], placemarkIcon: string) => {
    pins.map((pin) => {
      const placemark = getInfrastructurePlacemark(pin, placemarkIcon)

      if (isMobileView) {
        const placemarkId = placemark?.properties?.get('iden', {})

        placemark?.events.add('click', (item) => {
          setDataHoverInfrastructurePlacemark((state: any) => {
            if (!state || state?.id !== placemarkId) {
              return {
                coordinates: item.originalEvent.target.geometry?.getCoordinates(),
                text: pin.text,
                id: placemarkId,
              }
            }

            return null
          })
        })
      } else {
        placemark?.events.add('mouseenter', (item) =>
          setDataHoverInfrastructurePlacemark({
            coordinates: item.originalEvent.target.geometry?.getCoordinates(),
            text: pin.text,
          })
        )
        placemark?.events.add('mouseleave', () => setDataHoverInfrastructurePlacemark(null))
      }

      geoLink.add(placemark)
    })
  }

  const handleFillingProjectsCollection = (geoLink: any, pins: any[]) => {
    pins.map((pin) => {
      if (pin.main) {
        const circle = getCircle(pin.coordinates)
        const distanceInfoPlacemark = getDistanceInfoPlacemark(pin.coordinates)

        geoLink.add(circle).add(distanceInfoPlacemark)
      }

      const placemark = getProjectPlacemark(pin)

      if (isMobileView) {
        const placemarkId = placemark?.properties?.get('iden', {})

        placemark?.events.add('click', (item) => {
          setDataHoverProjectPlacemark((state: any) => {
            if (!state || state?.id !== placemarkId) {
              return {
                coordinates: item.originalEvent.target.geometry?.getCoordinates(),
                text: pin.text,
                height: pin.height,
                id: placemarkId,
              }
            }

            return null
          })
        })
      } else {
        placemark?.events.add('mouseenter', (item) =>
          setDataHoverProjectPlacemark({
            coordinates: item.originalEvent.target.geometry?.getCoordinates(),
            text: pin.text,
            height: pin.height,
            main: pin.main,
          })
        )
        placemark?.events.add('mouseleave', () => setDataHoverProjectPlacemark(null))
      }

      geoLink.add(placemark)
    })
  }

  // Geo object collections init
  useEffect(() => {
    if (!ymaps) return

    if (!geoComplexLink) setGeoComplexLink(new ymaps.GeoObjectCollection({}, {}))
    if (!geoParksLink) setGeoParksLink(new ymaps.GeoObjectCollection({}, {}))
    if (!geoCafeLink) setGeoCafeLink(new ymaps.GeoObjectCollection({}, {}))
    if (!geoSportLink) setGeoSportLink(new ymaps.GeoObjectCollection({}, {}))
    if (!geoEnvironmentLink) setGeoEnvironmentLink(new ymaps.GeoObjectCollection({}, {}))
    if (!geoProjectsLink) setGeoProjectsLink(new ymaps.GeoObjectCollection({}, {}))
    if (!geoHoverInfrastructurePlacemarkLink)
      setGeoHoverInfrastructurePlacemarkLink(new ymaps.GeoObjectCollection({}, {}))
    if (!geoHoverProjectPlacemarkLink)
      setGeoHoverProjectPlacemarkLink(new ymaps.GeoObjectCollection({}, {}))
  }, [
    ymaps,
    geoComplexLink,
    geoParksLink,
    geoCafeLink,
    geoSportLink,
    geoEnvironmentLink,
    geoProjectsLink,
    geoHoverInfrastructurePlacemarkLink,
    geoHoverProjectPlacemarkLink,
  ])

  // Start - Infrastructure view control - Start
  useEffect(() => {
    if (!map) return

    if (geoHoverInfrastructurePlacemarkLink && dataHoverInfrastructurePlacemark && currentMapZoom) {
      const placemark = getHoverInfrastructurePlacemark(dataHoverInfrastructurePlacemark)
      geoHoverInfrastructurePlacemarkLink?.removeAll()
      geoHoverInfrastructurePlacemarkLink.add(placemark)

      map.geoObjects.add(geoHoverInfrastructurePlacemarkLink)
    } else {
      geoHoverInfrastructurePlacemarkLink?.removeAll()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, geoHoverInfrastructurePlacemarkLink, dataHoverInfrastructurePlacemark, currentMapZoom])

  useEffect(() => {
    if (!map) return

    if (geoHoverProjectPlacemarkLink && dataHoverProjectPlacemark && currentMapZoom) {
      const placemark = getHoverProjectPlacemark(dataHoverProjectPlacemark)
      geoHoverProjectPlacemarkLink?.removeAll()
      geoHoverProjectPlacemarkLink.add(placemark)

      map.geoObjects.add(geoHoverProjectPlacemarkLink)
    } else {
      geoHoverProjectPlacemarkLink?.removeAll()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, geoHoverProjectPlacemarkLink, dataHoverProjectPlacemark, currentMapZoom])

  useEffect(() => {
    if (!map) return

    if (activeLegendTab === LegendTabs.INFRASTRUCTURE && geoProjectsLink && currentMapZoom) {
      geoProjectsLink?.removeAll()
      handleFillingProjectsCollection(geoProjectsLink, projectsPins)

      map.geoObjects.add(geoProjectsLink)
    } else {
      geoProjectsLink?.removeAll()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, geoProjectsLink, activeLegendTab, currentMapZoom])

  useEffect(() => {
    if (!map) return

    if (state.isComplexChecked && geoComplexLink && activeLegendTab === LegendTabs.INFRASTRUCTURE) {
      if (isMobileView) geoComplexLink?.removeAll()

      handleFillingGeoCollection(
        geoComplexLink,
        pins.residentialComplexesPins,
        `${building_pin.src}`
      )

      map.geoObjects.add(geoComplexLink)
    } else {
      geoComplexLink?.removeAll()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, geoComplexLink, state.isComplexChecked, activeLegendTab, isMobileView, activePin])

  useEffect(() => {
    if (!map) return

    if (state.isParksChecked && geoParksLink && activeLegendTab === LegendTabs.INFRASTRUCTURE) {
      if (isMobileView) geoParksLink?.removeAll()

      handleFillingGeoCollection(geoParksLink, pins.parksPins, `${brightness_up_pin.src}`)

      map.geoObjects.add(geoParksLink)
    } else {
      geoParksLink?.removeAll()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, state.isParksChecked, geoParksLink, activeLegendTab, isMobileView, activePin])

  useEffect(() => {
    if (!map) return

    if (state.isCafeChecked && geoCafeLink && activeLegendTab === LegendTabs.INFRASTRUCTURE) {
      if (isMobileView) geoCafeLink?.removeAll()

      handleFillingGeoCollection(geoCafeLink, pins.cafeRestaurantsPins, `${food_pin.src}`)

      map.geoObjects.add(geoCafeLink)
    } else {
      geoCafeLink?.removeAll()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, state.isCafeChecked, geoCafeLink, activeLegendTab, isMobileView, activePin])

  useEffect(() => {
    if (!map) return

    if (state.isSportChecked && geoSportLink && activeLegendTab === LegendTabs.INFRASTRUCTURE) {
      if (isMobileView) geoSportLink?.removeAll()

      handleFillingGeoCollection(geoSportLink, pins.sportPins, `${basketball_pin.src}`)

      map.geoObjects.add(geoSportLink)
    } else {
      geoSportLink?.removeAll()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, state.isSportChecked, geoSportLink, activeLegendTab, isMobileView, activePin])

  useEffect(() => {
    if (!map) return

    if (
      state.isEnvironmentChecked &&
      geoEnvironmentLink &&
      activeLegendTab === LegendTabs.INFRASTRUCTURE
    ) {
      if (isMobileView) geoEnvironmentLink?.removeAll()

      handleFillingGeoCollection(geoEnvironmentLink, pins.businessPins, `${briefcase_pin.src}`)

      map.geoObjects.add(geoEnvironmentLink)
    } else {
      geoEnvironmentLink?.removeAll()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    map,
    state.isEnvironmentChecked,
    geoEnvironmentLink,
    activeLegendTab,
    isMobileView,
    activePin,
  ])

  // End - Infrastructure view control - End

  const handleChangeZoomPlus = () => {
    map.setZoom(map.getZoom() + 1, { checkZoomRange: true })
    setCurrentMapZoom(map.getZoom() + 1)
  }

  const handleChangeZoomMinus = () => {
    map.setZoom(map.getZoom() - 1, { checkZoomRange: true })
    setCurrentMapZoom(map.getZoom() - 1)
  }

  const renderZoomButtons = () => {
    return (
      <div className={classes['zoom__container']}>
        <div className={classes['zoom__button']} onClick={handleChangeZoomPlus}>
          <Icon name="plus" />
        </div>
        <div className={classes['zoom__button']} onClick={handleChangeZoomMinus}>
          <Icon name="minus" />
        </div>
      </div>
    )
  }

  console.log(variables.legendModalElements)
  const renderModalContent = () => {
    return (
      <div className={classes['modal__container']}>
        {variables.legendModalElements.map((item, index) => (
          <div className={classes['modal__content']} key={index}>
            <div className={classes['modal__content-block']}>
              <div className={classes['modal__icon']}>
                <Image src={item.icon} width={20} height={20} alt="Иконка объекта" />
              </div>
              <p className={classes['modal__content-title']}>{item.title}</p>
            </div>
            <label className={classes['checkbox']}>
              <input type="checkbox" onChange={() => item.handleCheck((state) => !state)} />
              <span
                className={`${classes['checkbox__checkmark']} ${
                  item.isChecked ? classes['checkbox__checkmark-checked'] : ''
                }`}>
                {item.isChecked && <Icon name="check2" />}
              </span>
            </label>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={classes['section']}>
      <div className={classes['map-container']}>
        <div ref={mapRef} className={classes['map']}>
          {renderZoomButtons()}
        </div>

        {activeLegendTab === LegendTabs.PLAN && (
          <div className={classes['general-plan']}>
            <Image
              src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${project.data?.attributes.masterPlanImg?.data?.attributes?.url}`}
              alt="Ген. план"
              width={
                project.data?.attributes?.masterPlanImg?.data?.attributes?.width
                  ? project.data?.attributes?.masterPlanImg?.data?.attributes?.width
                  : 0
              }
              height={
                project.data?.attributes?.masterPlanImg?.data?.attributes?.height
                  ? project.data?.attributes?.masterPlanImg?.data?.attributes?.height
                  : 0
              }
              className={classes['general-plan__image']}
              priority={true}
            />
          </div>
        )}

        <div className={classes['modal']}>
          <div className={classes['modal__header']}>
            <p className={classes['modal__title']}>Окружение</p>
            <div
              className={`${classes['modal__header-icon']} ${
                isOpenedModal ? classes['modal__header-icon_rotated'] : ''
              }`}
              onClick={() => setIsOpenedModal((state) => !state)}>
              <Icon name="arrowDown" />
            </div>
          </div>

          {isOpenedModal && (
            <div className={classes['modal__tabs']}>
              <button
                className={`${classes['modal__tab']} ${
                  activeLegendTab === LegendTabs.PLAN ? classes['modal__tab_inactive'] : ''
                }`}
                onClick={() => setActiveLegendTab(LegendTabs.INFRASTRUCTURE)}>
                Инфрастуктура
              </button>
              {project.data.attributes.pstatus.data.attributes.title !== 'Продано' && (
                <button
                  className={`${classes['modal__tab']} ${
                    activeLegendTab === LegendTabs.INFRASTRUCTURE
                      ? classes['modal__tab_inactive']
                      : ''
                  }`}
                  onClick={() => setActiveLegendTab(LegendTabs.PLAN)}>
                  Ген. план
                </button>
              )}
            </div>
          )}
          {activeLegendTab === LegendTabs.INFRASTRUCTURE && isOpenedModal && renderModalContent()}
        </div>
      </div>
    </div>
  )
}

export default InfrastructureMap
