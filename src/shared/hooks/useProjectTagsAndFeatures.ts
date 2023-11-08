import {
  IDefaultMetro,
  IDefaultProjectDataAttributes,
  IDefaultProjectDataAttributesFeaturesData,
} from '../services/pageData/default/default.interface'
import { createTagsFromProjectFeatures } from '../utils/mapping'

export interface ITag {
  title: string
  description?: string
  withIcon?: boolean
  color?: string | string[]
}

export interface IProjectTagsAndFeatures {
  tags: ITag[]
  metroTag: ITag | null
  projectFeatures: IDefaultProjectDataAttributesFeaturesData[]
}

export const useProjectTagsAndFeatures = (
  projectAttributes: IDefaultProjectDataAttributes
): IProjectTagsAndFeatures => {
  const projectFeatures: IDefaultProjectDataAttributesFeaturesData[] =
    projectAttributes.features?.data.filter(
      (feature: IDefaultProjectDataAttributesFeaturesData) => !feature.attributes.tag || false
    )

  const tags: ITag[] = createTagsFromProjectFeatures(projectAttributes)

  const metroTag: ITag | null = projectAttributes.metro
    ? {
        title: projectAttributes.metro.map((elem: IDefaultMetro) => elem.station).join(', '),
        description: projectAttributes.metro
          .map((elem: IDefaultMetro) => elem.time_from + ' мин')
          .join(', '),
        withIcon: true,
        color: projectAttributes.metro.map((elem: IDefaultMetro) => elem.color),
      }
    : null

  return {
    tags,
    metroTag,
    projectFeatures,
  }
}
