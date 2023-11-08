import React, { FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import SaleStatus from 'shared/components/saleStatus/SaleStatus'
import DescriptionList from 'shared/components/descriptionList/DescriptionList'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.scss'
import { IconButton } from 'shared/uikit/IconButton'
import { Tabs } from 'shared/uikit/Tabs'
import { IDefaultMetro } from 'shared/services/pageData/default/default.interface'
import { IProject } from 'shared/services/pageData/projects/projects.interface'
import { MetroIcon } from 'shared/components/MetroIcon'
import { ETypeContent } from 'shared/types/typeContent.enum'
import Image from 'next/image'

interface IOurProjectsProps {
  projects: IProject[]
}

const slickSettings = {
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  draggable: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        draggable: true,
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

export const OurProjects: FC<IOurProjectsProps> = ({ projects }) => {
  //todo any
  const sliderRef = useRef() as any

  const [windowWidth, setWindowWidth] = useState<number | null>(null)
  const [isWithoutSlider, setIsWithoutSlider] = useState<boolean>(true)
  const [activeProjectsType, setActiveProjectsType] = useState<ETypeContent>(ETypeContent.OFFICE)

  const getMetroStationName = (metro: IDefaultMetro[]): string => {
    const metroStationNames: Array<string> = metro.map((metroElem) => metroElem.station)
    return metroStationNames.join(', ')
  }

  const getMetroTimeFrom = (metro: IDefaultMetro[]): string => {
    const metroTimeFrom: Array<string> = metro.map((metroElem) => `${metroElem.time_from} мин`)
    return metroTimeFrom.join(', ')
  }

  const getMetroColor = (metro: IDefaultMetro[]): string | string[] => {
    return metro.map((m: IDefaultMetro) => m.color)
  }

  const toggleActiveProjectsType = (type: ETypeContent): void => {
    if (activeProjectsType === type) return
    setActiveProjectsType(type)
  }

  const renderItem = (projects: IProject[]) => {
    return (
      projects &&
      projects
        .filter((project) => activeProjectsType === project.attributes.type)
        .map((project) => (
          <div key={project.id} className={'cs-slick-slider__item'}>
            <Link
              href={`${project.attributes.type === 'dom' ? '/residential/' : '/commercial/'}${
                project.attributes.projectUuid
              }`}
              className="tile">
              <div className="tile__image">
                <div className="img-adapt img-adapt_proportion_1">
                  <Image
                    priority={true}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    sizes="100%"
                    fill
                    src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${project.attributes.img.data.attributes.url}`}
                    alt={''}
                  />
                </div>
              </div>

              <div className="tile__footer">
                <div className="tile__status">
                  <SaleStatus
                    value={project.attributes.pstatus.data?.attributes.title || ''}
                    statusId={project.attributes.pstatus.data?.id}
                  />
                </div>

                <div className="tile__title">{project.attributes.title}</div>

                <div className="tile__description">{project.attributes.class}</div>

                <div className="tile__description-list">
                  <DescriptionList
                    modifierClassesStyle={['list_style_wide']}
                    value={[
                      `${project.attributes.area?.toLocaleString('ru-RU')} м²`,
                      `Готовность ${project.attributes.year}`,
                    ]}
                  />
                </div>

                <div className="tile__info tile-info">
                  <div className="tile-info__icon">
                    <MetroIcon
                      s="medium"
                      variant="white"
                      color={getMetroColor(project.attributes.metro) || ''}
                    />
                  </div>

                  <div className="tile-info__title">
                    {getMetroStationName(project.attributes.metro)}
                  </div>

                  <div className="tile-info__description">
                    {getMetroTimeFrom(project.attributes.metro)}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
    )
  }

  const renderSliderSection = (projects: IProject[]) => {
    if (isWithoutSlider) {
      return (
        <div className="section__body">
          <div className="cs-slick-slider cs-slick-slider_static">{renderItem(projects)}</div>
        </div>
      )
    } else {
      return (
        <div className="section__body section__body_offset">
          <Slider className="cs-slick-slider" ref={sliderRef} {...slickSettings}>
            {renderItem(projects)}
          </Slider>
        </div>
      )
    }
  }

  const checkWindowWidth = (): void => {
    if (windowWidth) {
      if (
        (windowWidth > 767 && projects.length > 3) ||
        (windowWidth > 374 && windowWidth <= 767 && projects.length > 2) ||
        (windowWidth <= 374 && projects.length > 1)
      ) {
        setIsWithoutSlider(false)
      } else {
        setIsWithoutSlider(true)
      }
    }
  }

  const updateWindowWidth = (): void => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    updateWindowWidth()
    window.addEventListener('resize', updateWindowWidth)
  }, [])

  useEffect(() => {
    checkWindowWidth()
  }, [windowWidth])

  return (
    <section className="layout__section section">
      <div className="section__header">
        <h2 className="section__title">Наши проекты</h2>

        <div className="section__switcher">
          <Tabs size="small" width="full">
            <Tabs.Item
              name="type"
              checked={activeProjectsType === ETypeContent.DOM}
              onChange={() => {
                toggleActiveProjectsType(ETypeContent.DOM)
              }}>
              Dom
            </Tabs.Item>
            <Tabs.Item
              name="type"
              checked={activeProjectsType === ETypeContent.OFFICE}
              onChange={() => {
                toggleActiveProjectsType(ETypeContent.OFFICE)
              }}>
              Office
            </Tabs.Item>
          </Tabs>
        </div>

        {!isWithoutSlider && (
          <div className="section__buttons">
            <div className="items-list">
              <div className="items-list__item">
                <IconButton
                  variant="blackFill"
                  icon="arrowLongLeft"
                  s="l"
                  onClick={() => sliderRef.current.slickPrev()}
                />
              </div>

              <div className="items-list__item">
                <IconButton
                  variant="blackFill"
                  icon="arrowLongRight"
                  s="l"
                  onClick={() => sliderRef.current.slickNext()}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {renderSliderSection(projects)}
    </section>
  )
}
