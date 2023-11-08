import { useState, useEffect } from 'react'
import {
  IDefaultPStatusData,
  IDefaultProjectData,
} from '../services/pageData/default/default.interface'

export interface IProjectByStatuses {
  activeStatusesId: number[]
  filteredProjectsByStatus: IDefaultProjectData[]
  isActiveTab: (id: number) => boolean
  toggleActiveTabState: (statusId: number) => void
}

export const useProjectsByStatus = (
  projects: IDefaultProjectData[],
  projectStatuses: IDefaultPStatusData[]
): IProjectByStatuses => {
  const [activeStatusesId, setActiveStatusesId] = useState<number[]>(
    projectStatuses.map((status: IDefaultPStatusData) => status.id) || []
  )
  const [filteredProjectsByStatus, setFilteredProjectsByStatus] = useState<IDefaultProjectData[]>(
    projects ? projects : []
  )

  const isActiveTab = (id: number): boolean => {
    return activeStatusesId.includes(id)
  }

  const toggleActiveTabState = (statusId: number): void => {
    if (isActiveTab(statusId)) {
      setActiveStatusesId((prev) => prev.filter((id: number) => id !== statusId))
    } else {
      setActiveStatusesId((prev) => [...prev, statusId])
    }
  }

  const filterProjectsByActiveStatuses = (): void => {
    setFilteredProjectsByStatus(() =>
      projects.filter((project: IDefaultProjectData) => {
        return activeStatusesId.includes(project.attributes.pstatus.data?.id)
      })
    )
  }

  useEffect(() => {
    filterProjectsByActiveStatuses()
  }, [activeStatusesId])

  return {
    activeStatusesId,
    filteredProjectsByStatus,
    isActiveTab,
    toggleActiveTabState,
  }
}
