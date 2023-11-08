import React, { FC } from 'react'
import classes from './IntroductoryTextWithVideo.module.scss'
import { Button } from 'shared/uikit/Button'
import { ICommercialProjectBlockPromo } from 'shared/services/pageData/commercialProject/commercialProject.interface'

interface IIntroductoryTextWithVideoProps {
  introductory: ICommercialProjectBlockPromo
  introductoryHandler?: () => void
  isResidential?: boolean
  isSold?: boolean
}

export const IntroductoryTextWithVideo: FC<IIntroductoryTextWithVideoProps> = ({
  introductory,
  introductoryHandler,
  isResidential,
  isSold,
}) => {
  return (
    <div className={classes.block}>
      <h1
        className={classes.block__title}
        dangerouslySetInnerHTML={{ __html: introductory.title || '' }}></h1>
      <div className={classes.block__description}>{introductory.text}</div>
      {isResidential && isSold ? (
        <></>
      ) : (
        <Button
          onClick={
            introductoryHandler
              ? introductoryHandler
              : () => {
                  console.log()
                }
          }
          s="large"
          width="full"
          width_m="auto">
          {introductory.button.text}
        </Button>
      )}
    </div>
  )
}
