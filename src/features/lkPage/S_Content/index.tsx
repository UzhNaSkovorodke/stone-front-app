import C_Content from 'src/features/lkPage/C_Content'
import classNames from 'classnames'
import React, { Dispatch, memo, SetStateAction, useEffect, useRef, useState } from 'react'
import classes from './style.module.scss'
import { Tabs } from 'shared/uikit/Tabs'

const S_Content = ({
  activeMenu,
  setActiveMenu,
  isMeetModal,
  setIsMeetModal,
  setIsClearModal,
  isClearModal,
}: {
  isMeetModal: boolean
  isClearModal: boolean
  setIsClearModal: Dispatch<SetStateAction<boolean>>
  activeMenu: string
  setIsMeetModal: Dispatch<SetStateAction<boolean>>
  setActiveMenu: Dispatch<SetStateAction<string>>
}) => {
  const cls = classNames(classes.root)
  const [switchValue, setSwitchValue] = useState<'DOM' | 'OFFICE'>('DOM')
  const domInputRef = useRef<HTMLInputElement>(null)
  // TODO проверить нет ли ошибки на сервере при рендеринге с window
  // let screenWidth = window.screen.width

  useEffect(() => {
    if (domInputRef.current && switchValue === 'DOM') {
      domInputRef.current.checked = true
    } else if (domInputRef.current && switchValue === 'DOM') domInputRef.current.checked = false
  }, [switchValue])

  return (
    <div className={cls}>
      <div className={classes.navigation}>
        <h2 dangerouslySetInnerHTML={{ __html: activeMenu }} />

        <div className={classes.tabsWrapper}>
          <Tabs size={1400 > 1021 ? 'small' : 'large'}>
            <Tabs.Item
              checked={switchValue === 'DOM'}
              onChange={(event) => {
                const target = event.target as HTMLInputElement
                target.checked ? setSwitchValue('DOM') : false
              }}
              ref={domInputRef}
              name="name">
              Dom
            </Tabs.Item>
            <Tabs.Item
              checked={switchValue === 'OFFICE'}
              name="name"
              onChange={(event) => {
                const target = event.target as HTMLInputElement
                target.checked ? setSwitchValue('OFFICE') : false
              }}>
              Office
            </Tabs.Item>
          </Tabs>
        </div>

        <div className={classes.clearBtnWrapper}>
          {activeMenu === 'Избранное' ? (
            <button
              className={classNames(classes.clearBtn, {
                [classes.activeClearBtn]: isClearModal,
              })}
              onClick={() => setIsClearModal(true)}>
              Очистить список
            </button>
          ) : null}
        </div>
      </div>
      <C_Content
        isMeetModal={isMeetModal}
        setIsMeetModal={setIsMeetModal}
        typeContent={switchValue}
        setActiveMenu={setActiveMenu}
        activeMenu={activeMenu}
      />
    </div>
  )
}

export default memo(S_Content)
