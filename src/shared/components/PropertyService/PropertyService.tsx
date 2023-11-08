import React, { FC } from 'react'
import classes from 'shared/components/PropertyService/PropertyService.module.scss'
import { useGenerateClasses } from 'shared/hooks/useGenerateClasses'
import { IconButton } from 'shared/uikit/IconButton'
import { Icon } from 'shared/uikit/Icon'

interface IPropertyServiceProps {
  title: string
  text: string
  modifierClassesStyle?: string[]
  onClick?: () => void
}

const PropertyService: FC<IPropertyServiceProps> = ({
  title,
  text,
  modifierClassesStyle = [''],
  onClick,
}) => {
  const PropertyServiceModifierClasses: string = useGenerateClasses(classes, modifierClassesStyle)

  return (
    <div className={`${classes['banner-service']} ${PropertyServiceModifierClasses}`}>
      <div className={classes['banner-service__images-container']}>
        <div className={classes['banner-service__image']}>
          <Icon name="responsibility" />
          <Icon name="responsibilityDark" />
        </div>

        <div
          className={`${classes['banner-service__image']} ${classes['banner-service__image_rotate']}`}>
          <Icon name="responsibility" />
          <Icon name="responsibilityDark" />
        </div>
      </div>

      <div className={classes['banner-service__content']}>
        <p className={classes['banner-service__title']}>{title}</p>
        <p className={classes['banner-service__description']}>{text}</p>
      </div>
      <div className={[classes['banner-service__button-arrow'], classes.service__button].join(' ')}>
        <IconButton onClick={onClick} icon="arrowLongRight" variant="whiteFill" />
        <IconButton onClick={onClick} icon="arrowLongRight" variant="whiteStroke" />
      </div>
    </div>
  )
}

export default PropertyService
