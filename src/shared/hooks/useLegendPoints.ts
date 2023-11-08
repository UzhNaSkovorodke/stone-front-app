import { ILegendModalElement, ILegendPin } from '../types/mapTypes'
import { IDefaultDataPoint, IDefaultPoint } from '../services/pageData/default/default.interface'
import {
  EPointId,
  IPointTypesData,
  IPointTypesResponse,
} from '../services/pageData/pointTypes/pointTypes.interface'
import { useState } from 'react'

export const useLegendPoints = (pointsTypes: IPointTypesResponse, points: IDefaultDataPoint) => {
  const [isComplexChecked, setIsComplexChecked] = useState<boolean>(true)
  const [isParksChecked, setIsParksChecked] = useState<boolean>(true)
  const [isCafeChecked, setIsCafeChecked] = useState<boolean>(true)
  const [isSportChecked, setIsSportChecked] = useState<boolean>(true)
  const [isEnvironmentChecked, setIsEnvironmentChecked] = useState<boolean>(true)

  const getLegendModalElement = (point: IPointTypesData): ILegendModalElement => {
    switch (point.id) {
      case EPointId.RESIDENTIAL_COMPLEXES:
        return {
          isChecked: isComplexChecked,
          handleCheck: setIsComplexChecked,
          title: point.attributes.title || '',
          icon: `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${point.attributes.img?.data?.attributes?.url}`,
        }
      case EPointId.PARKS:
        return {
          isChecked: isParksChecked,
          handleCheck: setIsParksChecked,
          title: point.attributes.title || '',
          icon: `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${point.attributes.img?.data?.attributes?.url}`,
        }
      case EPointId.CAFE_RESTAURANTS:
        return {
          isChecked: isCafeChecked,
          handleCheck: setIsCafeChecked,
          title: point.attributes.title || '',
          icon: `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${point.attributes.img?.data?.attributes?.url}`,
        }
      case EPointId.SPORT:
        return {
          isChecked: isSportChecked,
          handleCheck: setIsSportChecked,
          title: point.attributes.title || '',
          icon: `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${point.attributes.img?.data?.attributes?.url}`,
        }
      case EPointId.BUSINESS:
        return {
          isChecked: isEnvironmentChecked,
          handleCheck: setIsEnvironmentChecked,
          title: point.attributes.title || '',
          icon: `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${point.attributes.img?.data?.attributes?.url}`,
        }
      default:
        return {} as ILegendModalElement
    }
  }

  const getPointsById = (id: EPointId): IDefaultPoint[] => {
    return points.data?.filter((point: IDefaultPoint) => point.attributes.poi_type.data?.id === id)
  }

  const mapPointsToPins = (points: IDefaultPoint[]): ILegendPin[] => {
    return points.map((point: IDefaultPoint) => ({
      coordinates: [Number(point.attributes.geo?.lat) || 0, Number(point.attributes.geo.long) || 0],
      text: point.attributes.title || '',
    }))
  }

  const legendModalElements: ILegendModalElement[] =
    pointsTypes.data.map((point: IPointTypesData) => getLegendModalElement(point)) || []

  const residentialComplexesPins: ILegendPin[] = mapPointsToPins(
    getPointsById(EPointId.RESIDENTIAL_COMPLEXES)
  )
  const parksPins: ILegendPin[] = mapPointsToPins(getPointsById(EPointId.PARKS))
  const cafeRestaurantsPins: ILegendPin[] = mapPointsToPins(
    getPointsById(EPointId.CAFE_RESTAURANTS)
  )
  const sportPins: ILegendPin[] = mapPointsToPins(getPointsById(EPointId.SPORT))
  const businessPins: ILegendPin[] = mapPointsToPins(getPointsById(EPointId.BUSINESS))

  return {
    state: {
      isComplexChecked,
      isParksChecked,
      isCafeChecked,
      isSportChecked,
      isEnvironmentChecked,
    },
    pins: { residentialComplexesPins, parksPins, cafeRestaurantsPins, sportPins, businessPins },
    variables: { legendModalElements },
  }
}
