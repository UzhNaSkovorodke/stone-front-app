import { ITag } from '../hooks/useProjectTagsAndFeatures'
import {
  IDefaultMetro,
  IDefaultProjectDataAttributes,
  IDefaultProjectDataAttributesFeaturesData,
} from '../services/pageData/default/default.interface'

export interface IMetroMappedForTag {
  metroName: string
  metroTime: string
  metroColorIcon: string[]
}

export const mappedMetroPropertyForTag = (
  metro: IDefaultMetro[] | null
): IMetroMappedForTag | null => {
  if (metro) {
    const metroName: string = metro.map((item: IDefaultMetro) => item.station || '').join(', ')

    const metroTime: string = metro
      .map((item: IDefaultMetro) => item.time_from || '')
      .join(' мин, ')
      .concat(' мин')

    const metroColorIcon: string[] = metro.map((item: IDefaultMetro) => item.color)

    return { metroName, metroTime, metroColorIcon }
  }

  return null
}

export const createTagsFromProjectFeatures = (
  projectAttributes: IDefaultProjectDataAttributes
): ITag[] => {
  const tags: IDefaultProjectDataAttributesFeaturesData[] = projectAttributes.features?.data.filter(
    (feature: IDefaultProjectDataAttributesFeaturesData) => feature.attributes.tag === true
  )

  const mappedFeaturesToTags: ITag[] = tags
    ?.filter((f) => f.attributes.category !== 'investment')
    .map((tag: IDefaultProjectDataAttributesFeaturesData) => ({
      title: tag.attributes.feature || '',
    }))

  return mappedFeaturesToTags
}

export const strToNum = (s: string): number => parseFloat(s.replace(/\s/g, ''))
