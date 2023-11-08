import { observer } from 'mobx-react-lite'
import React from 'react'
import classes from './style.module.scss'
import { Button } from 'shared/uikit/Button'
import { Icon } from 'shared/uikit/Icon'

const C_EmptyContent = observer(({ activeMenu }: { activeMenu: string }) => {
  return (
    <div className={classes.empty}>
      <div className={classes.svgWrapper}>
        <Icon name="empty" />
      </div>
      <h2>Здесь пока пусто</h2>
      {activeMenu === 'Подборки' ? (
        <p>
          В этом разделе появятся объекты жилой или коммерческой
          <br className={classes.brDesktop} />
          недвижимости, добавленные менеджером на встрече
        </p>
      ) : (
        <p>
          Сохраняйте понравившиеся объекты жилой
          <br />
          или коммерческой недвижимости
        </p>
      )}

      <div className={classes.catalogBtn}>
        <Button
          width="full"
          s="large"
          variant="blackStroke"
          onClick={() => console.log('переход в каталог')}>
          Перейти в каталог
        </Button>
      </div>
    </div>
  )
})

export default C_EmptyContent
