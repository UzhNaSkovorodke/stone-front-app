import React, { FC } from 'react'
import classes from './Recommendations.module.scss'
import { ProjectCard } from 'shared/components/ProjectCard/ProjectCard'
import { ICommercialProjectBlockRecProjects } from 'shared/services/pageData/commercialProject/commercialProject.interface'

interface RecommendationsProps {
  recProjects: ICommercialProjectBlockRecProjects
}

export const Recommendations: FC<RecommendationsProps> = ({ recProjects }) => {
  return (
    <div className={classes.section}>
      <div className={classes.teaserList}>
        <div className={classes.teaserList__title}>{recProjects?.title}</div>

        <div className={classes.teaserList__list}>
          {recProjects.recProjects.data.map((project, index) => (
            <div key={index}>
              <ProjectCard
                projectAttributes={project.attributes}
                projectId={project.attributes.projectUuid}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
