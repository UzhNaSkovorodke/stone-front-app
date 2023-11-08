import React, { FC } from 'react'
import {
  SaleStatusPropsInterface,
  ESaleStatusId,
} from 'shared/components/saleStatus/saleStatusPropsInterface'
import classes from 'shared/components/saleStatus/SaleStatus.module.scss'
import { useGenerateClasses } from 'shared/hooks/useGenerateClasses'
import { Icon } from 'shared/uikit/Icon'

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
        {modifierClassesStyle.includes('') && <Icon name="boltInCircle" />}

        {modifierClassesStyle.includes('status_soon') && <Icon name="soonSale" />}

        {modifierClassesStyle.includes('status_sale') && <Icon name="onSale" />}

        {modifierClassesStyle.includes('status_sold') && <Icon name="sold" />}
      </div>

      <div className={classes.status__value}>{value}</div>
    </div>
  )
}

export default SaleStatus
