import { FC } from 'react'
import classes from './styles.module.scss'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import project_office_large from '/public/image/project_office_large.png'
import project_office_medium from '/public/image/project_office_medium.png'
import project_office_small from '/public/image/project_office_small.png'
import ProjectsPresentationMap from 'shared/components/map/ProjectsPresentationMap'
import PropertyService from 'shared/components/PropertyService/PropertyService'
import { Tabs } from 'shared/uikit/Tabs'
import { ProjectsSwitcherTabs } from 'src/pages/commercial'
import {
  IDefaultProjectData,
  IDefaultPStatusData,
  IDefaultPStatuses,
} from 'shared/services/pageData/default/default.interface'
import { ProjectCard } from 'shared/components/ProjectCard/ProjectCard'
import { TabButton } from 'shared/uikit/TabButton'
import { IProjectByStatuses, useProjectsByStatus } from 'shared/hooks/useProjectsByStatus'
import {
  IBlockPromoBottom,
  IBlockPromoMiddle,
} from 'shared/services/pageData/office/office.interface'
import { Icon } from 'shared/uikit/Icon'
import { IconButton } from 'shared/uikit/IconButton'

interface IProjectsProps {
  projects: IDefaultProjectData[]
  propertyServiceBanner: IBlockPromoMiddle
  stoneBanner: IBlockPromoBottom
  projectsActiveSwitch: ProjectsSwitcherTabs
  projectStatuses: IDefaultPStatuses
  openPropertyService: (isOpen: boolean) => void
  onOpenProjectsPresentationMap: () => void
  onCloseProjectsPresentationMap: () => void
}

export const Projects: FC<IProjectsProps> = ({
  projects,
  propertyServiceBanner,
  openPropertyService,
  stoneBanner,
  projectsActiveSwitch,
  projectStatuses,
  onCloseProjectsPresentationMap,
  onOpenProjectsPresentationMap,
}) => {
  let statuses: IDefaultPStatusData[] = projectStatuses.data
  //TODO SP-186 убрать когда появятся проекте с таким статусом
  statuses = statuses.filter((data) => data.attributes.title !== 'Скоро в продаже')
  const clientWidth = useClientWidth()
  const isSmallScreenView = clientWidth <= 1439
  const ourProjects: IProjectByStatuses = useProjectsByStatus(projects, statuses)
  const renderTabs = () => {
    return statuses.map((status: IDefaultPStatusData) => (
      <TabButton
        checked={ourProjects.isActiveTab(status.id)}
        onChange={() => ourProjects.toggleActiveTabState(status.id)}
        text={status.attributes.title}
        variant="2"
        size="medium"
        width="auto"
        type="checkbox"
        key={status.id}
      />
    ))
  }

  const getOfficeBannerImage = () => {
    const desktop = clientWidth >= 1440
    const tablet = clientWidth >= 1024

    if (desktop) {
      return `url(${project_office_large.src})`
    }

    if (tablet) {
      return `url(${project_office_medium.src})`
    }

    return `url(${project_office_small.src})`
  }

  return (
    <section className={classes['section']}>
      <div className={classes['project-list']}>
        {isSmallScreenView && <p className={classes['header__title_mobile']}>Наши проекты</p>}

        {isSmallScreenView ? (
          <div className={classes['header']}>
            <div className={classes['header__block']}>
              <div id="map" className={classes['header__tabs']}>
                {renderTabs()}
              </div>
              <Tabs size="small">
                <Tabs.Item
                  checked={projectsActiveSwitch === ProjectsSwitcherTabs.LIST}
                  onChange={onCloseProjectsPresentationMap}>
                  {ProjectsSwitcherTabs.LIST}
                </Tabs.Item>
                <Tabs.Item
                  checked={projectsActiveSwitch === ProjectsSwitcherTabs.MAP}
                  onChange={onOpenProjectsPresentationMap}>
                  {ProjectsSwitcherTabs.MAP}
                </Tabs.Item>
              </Tabs>
            </div>
          </div>
        ) : (
          <div className={classes['header']}>
            <p id="top" className={classes['header__title']}>
              Наши проекты
            </p>
            <div id="map" className={classes['header__tabs']}>
              {renderTabs()}
            </div>

            <Tabs size="small">
              <Tabs.Item
                checked={projectsActiveSwitch === ProjectsSwitcherTabs.LIST}
                onChange={onCloseProjectsPresentationMap}>
                {ProjectsSwitcherTabs.LIST}
              </Tabs.Item>
              <Tabs.Item
                checked={projectsActiveSwitch === ProjectsSwitcherTabs.MAP}
                onChange={onOpenProjectsPresentationMap}>
                {ProjectsSwitcherTabs.MAP}
              </Tabs.Item>
            </Tabs>
          </div>
        )}

        {projectsActiveSwitch === ProjectsSwitcherTabs.MAP && (
          <ProjectsPresentationMap
            onCloseMap={onCloseProjectsPresentationMap}
            projects={ourProjects.filteredProjectsByStatus}
          />
        )}

        {projectsActiveSwitch === ProjectsSwitcherTabs.LIST && (
          <div className={classes['main']}>
            {ourProjects.filteredProjectsByStatus &&
              ourProjects.filteredProjectsByStatus.map((project: IDefaultProjectData, index) => {
                if (index === 1) {
                  return (
                    <div key={project.id} className={classes.projectServices}>
                      <ProjectCard
                        projectAttributes={project.attributes}
                        projectId={project.attributes.projectUuid}
                      />
                      <PropertyService
                        title={propertyServiceBanner.title}
                        text={propertyServiceBanner.text}
                        onClick={() => openPropertyService(true)}
                      />
                    </div>
                  )
                }
                return (
                  <ProjectCard
                    projectAttributes={project.attributes}
                    projectId={project.attributes.projectUuid}
                    key={project.id}
                  />
                )
              })}
            <div
              className={classes['banner-office']}
              style={{ backgroundImage: getOfficeBannerImage() }}>
              <div className={classes['banner-office__content']}>
                <div className={classes['banner-office__title']}>
                  <Icon name="stoneOffice" />
                </div>
                <p className={classes['banner-office__description']}>{stoneBanner.text}</p>
              </div>
              <IconButton
                icon={'arrowLongRight'}
                href={'/standardsoffice'}
                s="l"
                variant="whiteStroke"
                className={`button_style_transparent ${classes['banner-office__button-arrow']}`}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
