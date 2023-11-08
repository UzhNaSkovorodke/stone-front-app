import React, { FC, useEffect, useState } from 'react'
import classes from 'src/features/commercialDetailsPage/AboutProjects/AboutProjects.module.scss'
import DescriptionList from 'shared/components/descriptionList/DescriptionList'
import { Metro } from 'shared/components/Metro'
import { Tag2 } from 'shared/uikit/Tag2'
import {
  IDefaultProject,
  IDefaultProjectDataAttributesFeaturesData,
} from 'shared/services/pageData/default/default.interface'
import { IMetroMappedForTag, mappedMetroPropertyForTag } from 'shared/utils/mapping'

interface IAboutProjectsProps {
  project: IDefaultProject
  isSold: boolean
}

export const AboutProjects: FC<IAboutProjectsProps> = ({ project, isSold }) => {
  const tags: IDefaultProjectDataAttributesFeaturesData[] =
    project.data?.attributes.features.data?.filter(
      (feature: IDefaultProjectDataAttributesFeaturesData) => feature.attributes.tag
    )

  const metroPropertiesForTag: IMetroMappedForTag | null = mappedMetroPropertyForTag(
    project.data?.attributes.metro
  )

  // eslint-disable-next-line unused-imports/no-unused-vars
  const [numberOfSlides, setNumberOfSlides] = useState<number | null>(null)

  const transitionDuration = 300
  const delay = 3000

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [sliderTimer, setSliderTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  const [isClick, setIsClick] = useState<boolean>(false)
  const [isAnimation, setIsAnimation] = useState<boolean>(false)
  const [screenWidth, setScreenWidth] = useState<number>()

  useEffect(() => {
    setScreenWidth(window.screen.width)
  }, [])

  const getDescriptionsFromProject = (): string[] => {
    const descriptions: IDefaultProjectDataAttributesFeaturesData[] =
      project.data.attributes.features.data.filter(
        (feature: IDefaultProjectDataAttributesFeaturesData) =>
          feature.attributes.category === 'header'
      )
    return descriptions.map(
      (description: IDefaultProjectDataAttributesFeaturesData) =>
        description.attributes.feature || ''
    )
  }

  useEffect(() => {
    setIsAnimation(true)

    setTimeout(() => {
      setIsAnimation(false)
    }, transitionDuration * 2)
  }, [currentSlide])

  useEffect(() => {
    if (!isAnimation && delay > 1000) {
      const timer = setTimeout(() => {
        if (numberOfSlides && currentSlide >= numberOfSlides - 1) {
          setCurrentSlide(0)

          return
        }

        setCurrentSlide(currentSlide + 1)
      }, delay)

      setSliderTimer(timer)
    }
  }, [isAnimation])

  useEffect(() => {
    if (isClick && sliderTimer) {
      clearTimeout(sliderTimer)
      setSliderTimer(null)

      setIsClick(false)
    }
  }, [isClick])

  return (
    <div className={classes.blockList}>
      <div className={classes.blockList__item}>
        <div className={classes.leftSide}>
          <div className={classes.leftSide__content}>
            <div
              className={classes.leftSide__title + ' ' + (!isAnimation ? classes.isAnimate : '')}>
              <span
                dangerouslySetInnerHTML={{
                  __html: project.data?.attributes.title || '',
                }}></span>
            </div>

            <div className={classes.leftSide__address}>
              {project.data?.attributes.address || ''}
            </div>

            <div className={classes.leftSide__list}>
              {metroPropertiesForTag && (
                <div className={classes.leftSide__item}>
                  <Tag2 variant="black">
                    <Metro
                      color={metroPropertiesForTag.metroColorIcon}
                      name={metroPropertiesForTag.metroName}
                      time={
                        screenWidth && screenWidth < 383
                          ? undefined
                          : metroPropertiesForTag.metroTime
                      }
                      variant="black"
                    />
                  </Tag2>
                </div>
              )}
              {tags &&
                tags.map((tag) => (
                  <div className={classes.leftSide__item} key={tag.id}>
                    <Tag2 variant="black">{tag.attributes.feature || ''}</Tag2>
                  </div>
                ))}
            </div>
          </div>

          <div className={classes.leftSide__footer}>
            <DescriptionList
              value={getDescriptionsFromProject()}
              modifierClassesStyle={['list_style_light', 'list_size_l']}
            />
          </div>
        </div>
      </div>

      <div className={classes.blockList__item}>
        <div className={classes.rightSide}>
          {isSold && (
            <div className={classes.rightSide__content}>
              <div className={classes.rightSide__info}>Продано</div>
            </div>
          )}
          {!isSold && (
            <>
              <div className={classes.rightSide__description}>
                <DescriptionList
                  value={getDescriptionsFromProject()}
                  modifierClassesStyle={['list_style_light', 'list_size_l']}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
