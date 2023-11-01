import React, { FC } from 'react'
import { SaleStatusPropsInterface, ESaleStatusId } from './saleStatusPropsInterface'
import classes from './SaleStatus.module.scss'
import { useGenerateClasses } from 'shared/lib/hooks/useGenerateClasses'
import SvgIcon from 'shared/ui/svgIcon/SvgIcon'

const SaleStatus: FC<SaleStatusPropsInterface> = ({ value, statusId }) => {
  const getModifierClassesStyleById = (): string[] => {
    switch (statusId) {
      case ESaleStatusId.DEFAULT:
        return ['']
      case ESaleStatusId.STATUS_SALE:
        return ['status_sale']
      case ESaleStatusId.STATUS_SOLD:
        return ['status_sold']
      case ESaleStatusId.STATUS_SOON:
        return ['status_soon']
      default:
        return ['']
    }
  }

  const modifierClassesStyle: string[] = getModifierClassesStyleById()
  const statusModifierClasses = useGenerateClasses(classes, modifierClassesStyle)

  return (
    <div className={classes.status + ' ' + statusModifierClasses}>
      <div className={classes.status__icon}>
        {modifierClassesStyle.includes('') && <SvgIcon name={'bolt'} />}

        {modifierClassesStyle.includes('status_soon') && <SvgIcon name={'time'} />}

        {modifierClassesStyle.includes('status_sale') && <SvgIcon name={'star'} />}

        {modifierClassesStyle.includes('status_sold') && <SvgIcon name={'check'} />}
      </div>

      <div className={classes.status__value}>{value}</div>
    </div>
  )
}

export default SaleStatus
