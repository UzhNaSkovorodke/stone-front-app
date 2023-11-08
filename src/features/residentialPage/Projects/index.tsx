import { FC } from 'react'

import classes from './styles.module.scss'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import project_dom_large from '/public/image/project_dom_large.png'
import project_dom_medium from '/public/image/project_dom_medium.png'
import project_dom_small from '/public/image/project_dom_small.png'
import { ProjectCard } from 'shared/components/ProjectCard/ProjectCard'
import ProjectsPresentationMap from 'shared/components/map/ProjectsPresentationMap'
import { Tabs } from 'shared/uikit/Tabs'
import { ProjectsSwitcherTabs } from 'src/pages/residential'
import {
  IDefaultProjectData,
  IDefaultPStatusData,
  IDefaultPStatuses,
} from 'shared/services/pageData/default/default.interface'
import { IProjectByStatuses, useProjectsByStatus } from 'shared/hooks/useProjectsByStatus'
// import { TabButton } from 'shared/uikit/TabButton'
import { IBlockPromo } from 'shared/services/pageData/office/office.interface'
import { Icon } from 'shared/uikit/Icon'
import { IconButton } from 'shared/uikit/IconButton'

interface IProjectsProps {
  projects: IDefaultProjectData[]
  //   propertyServiceBanner: IBlockMortgage;
  stoneBanner: IBlockPromo
  projectsActiveSwitch: ProjectsSwitcherTabs
  projectStatuses: IDefaultPStatuses
  onOpenProjectsPresentationMap: () => void
  onCloseProjectsPresentationMap: () => void
}

export const Projects: FC<IProjectsProps> = ({
  projects,
  // propertyServiceBanner,
  stoneBanner,
  projectsActiveSwitch,
  projectStatuses,
  onCloseProjectsPresentationMap,
  onOpenProjectsPresentationMap,
}) => {
  const statuses: IDefaultPStatusData[] = projectStatuses.data
  const clientWidth = useClientWidth()
  const isSmallScreenView = clientWidth <= 1439
  const ourProjects: IProjectByStatuses = useProjectsByStatus(projects, statuses)

  // eslint-disable-next-line unused-imports/no-unused-vars
  const renderTabs = () => {
    // return statuses.map((status) => (
    //     <TabButton
    //         checked={ourProjects.isActiveTab(status.id)}
    //         onChange={() => ourProjects.toggleActiveTabState(status.id)}
    //         text={status.attributes.title}
    //         variant="2"
    //         size="medium"
    //         width="auto"
    //         type="checkbox"
    //         key={status.id}
    //     />
    // ));
  }

  const getOfficeBannerImage = () => {
    const desktop = clientWidth >= 1440
    const tablet = clientWidth >= 1024

    if (desktop) {
      return `url(${project_dom_large.src})`
    }

    if (tablet) {
      return `url(${project_dom_medium.src})`
    }

    return `url(${project_dom_small.src})`
  }

  return (
    <section className={classes['section']} id="top">
      <div className={classes['project-list']}>
        {isSmallScreenView && <p className={classes['header__title_mobile']}>Наши проекты</p>}
        {isSmallScreenView ? (
          <div className={classes['header']}>
            <div className={classes['header__block']}>
              <div className={classes['header__tabs']}>{/*{renderTabs()}*/}</div>
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
            <p className={classes['header__title']}>Наши проекты</p>
            <div className={classes['header__tabs']}>{/*{renderTabs()}*/}</div>
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
            projects={ourProjects.filteredProjectsByStatus}
            onCloseMap={onCloseProjectsPresentationMap}
          />
        )}

        {projectsActiveSwitch === ProjectsSwitcherTabs.LIST && (
          <div className={classes['main']}>
            {ourProjects.filteredProjectsByStatus &&
              ourProjects.filteredProjectsByStatus.map((project: IDefaultProjectData, index) => {
                if (index === 1) {
                  return (
                    <div key={project.id}>
                      <ProjectCard
                        projectAttributes={project.attributes}
                        projectId={project.attributes.projectUuid}
                      />
                      {/* <PropertyService
                                        title = {propertyServiceBanner.title}
                                        text = {propertyServiceBanner.text}
                                    /> */}
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
              className={classes['banner-dom']}
              style={{
                backgroundImage: getOfficeBannerImage(),
              }}>
              <div className={classes['banner-dom__content']}>
                <div className={classes['banner-dom__title']}>
                  <Icon name="stoneDom" />
                </div>
                <p className={classes['banner-dom__description']}>{stoneBanner.title}</p>
              </div>
              <IconButton
                icon={'arrowLongRight'}
                href={'/standardsdom'}
                s="l"
                variant="whiteStroke"
                className={`button_style_transparent ${classes['banner-dom__button-arrow']}`}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
