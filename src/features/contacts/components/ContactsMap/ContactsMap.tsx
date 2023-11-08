import { useYMaps } from '@pbe/react-yandex-maps'
import { FC, useEffect, useRef, useState } from 'react'
import classes from './styles.module.scss'
import location_placemark from '/public/image/location_placemark.png'
import Link from 'next/link'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import { IDefaultGeo } from 'shared/services/pageData/default/default.interface'
import { Icon } from 'shared/uikit/Icon'

interface IContactsMapProps {
  coordinates: IDefaultGeo
}

export const ContactsMap: FC<IContactsMapProps> = ({ coordinates }) => {
  const coordinatesPoint = [Number(coordinates.lat || 0), Number(coordinates.long || 0)]
  const lat = coordinatesPoint[0]
  const long = coordinatesPoint[1]
  const routeRef = `https://yandex.ru/maps/213/moscow/?ll=${long}%2C${lat}&mode=routes&rtext=~${lat}%2C${long}&rtt=auto&ruri=~&z=10`
  const clientWidth = useClientWidth()
  const isMobileView = clientWidth <= 1024
  const defaultZoom = 15

  const [map, setMap] = useState<any>(null)
  const mapRef = useRef(null)
  const ymaps = useYMaps(['Map', 'Placemark', 'Circle'])

  const getPlacemark = (coordinates: number[]) => {
    if (!ymaps) return

    return new ymaps.Placemark(
      coordinates,
      {},
      {
        zIndex: 2,
        iconLayout: 'default#image',
        iconImageHref: `${location_placemark.src}`,
        iconImageSize: [24, 24],
        iconImageOffset: [-12, -12],
      }
    )
  }

  const getCircle = (coordinates: number[]) => {
    if (!ymaps) return

    return new ymaps.Circle(
      [coordinates, 80],
      {},
      {
        fillColor: '#FFFFFF',
        strokeColor: '#777E90',
        strokeWidth: 1,
      }
    )
  }

  const getRouteButton = () => (
    <Link href={routeRef} className={classes['route-button']} target="blank">
      <p className={classes['route-button__title']}>Проложить маршрут</p>
      <Icon name="route" />
    </Link>
  )

  // Map init
  useEffect(() => {
    if (!ymaps || !mapRef.current) return

    if (!mapRef.current) return

    const ymap = new ymaps.Map(
      mapRef.current,
      {
        center: coordinatesPoint,
        zoom: defaultZoom,
      },
      {
        maxZoom: defaultZoom,
        minZoom: defaultZoom,
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

    map.geoObjects.add(getPlacemark(coordinatesPoint)).add(getCircle(coordinatesPoint))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

  return (
    <div className={classes['map-container']}>
      <div ref={mapRef} className={classes['map']}>
        {isMobileView && getRouteButton()}
      </div>
    </div>
  )
}
