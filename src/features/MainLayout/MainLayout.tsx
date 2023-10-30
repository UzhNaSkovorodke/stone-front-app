'use client'
import React, { Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react'
import SvgIcon from 'shared/ui/svgIcon/SvgIcon'
import Link from 'next/link'
import Switcher from 'shared/ui/switcher/Switcher'
import Image from 'next/image'
import { Icon } from 'shared/ui/Icon/Icon'
import { useRouter } from 'next/navigation'
import { Button } from 'shared/ui/Button/Button'
import { EModalVariant } from 'shared/lib/types/modal.interface'
import CallbackButton from 'shared/ui/CallbackButton/CallbackButton'
import { useIntersectionObserver } from 'react-intersection-observer-hook'
import { CookiesNotification } from 'shared/ui/CookiesNotification/CookiesNotification'
import { CookieValueTypes, getCookie } from 'cookies-next'
import { ICommonAttributes } from 'shared/lib/pageData/common/common.interface'
import { IPropertyServiceResponse } from 'shared/lib/pageData/propertyService/propertyService.interface'
import { Form } from 'widgets/Form/Form'
import { useLayoutModal } from 'shared/lib/hooks/useLayoutModal'
import { useClientWidth } from 'shared/lib/hooks/useClientWidth'
import { EFormType } from 'shared/lib/types/form.interface'

export interface IPropertyService {
  propertyServiceData: IPropertyServiceResponse
  propertyServiceState: {
    isOpen: boolean
    openProperty: (isOpen: boolean) => void
  }
}

interface MainLayoutPropsInterface {
  common: ICommonAttributes
  children?: React.ReactNode
  activeTabHeader?: 'dom' | 'office' | null
  isDisplayFooter?: boolean
  mobileHeader?: ReactNode
  setIsFooter?: Dispatch<SetStateAction<boolean>>
  propertyService?: IPropertyService
  isOpenCallbackModal?: boolean
  callbackModalVariation?: EFormType
  changeCallbackModalVariation?: Dispatch<EFormType>
  toggleCallbackModal?: () => void
  isAcceptedCookie?: (isAccepted: CookieValueTypes) => void
  purchaseMessage?: string | undefined
}

export const MainLayout: FC<MainLayoutPropsInterface> = ({
  children,
  common,
  activeTabHeader = null,
  isDisplayFooter = true,
  mobileHeader,
  setIsFooter,
  propertyService,
  isOpenCallbackModal,
  callbackModalVariation,
  changeCallbackModalVariation,
  toggleCallbackModal,
  isAcceptedCookie,
  purchaseMessage,
}) => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isCookiesAccepted, setIsCookiesAccepted] = useState<CookieValueTypes>(true)

  const [footerRef, { entry }] = useIntersectionObserver()
  const isVisible = entry && entry.isIntersecting

  const [isDisplayHeaderSwitch, setIsDisplayHeaderSwitch] = useState<boolean>(false)
  const [isDisplayHeaderMenu, setIsDisplayHeaderMenu] = useState<boolean>(false)

  let oldScrollPosition: number | null = null

  const { modal, email, hash, loading } = useLayoutModal(isOpenCallbackModal ?? false)

  const clientWidth: number = useClientWidth()
  // const tabletWidth: number = 1024

  const isDesktop: boolean = clientWidth >= 1440

  useEffect(() => {
    const headerPhone = document.getElementById('header_phone') as HTMLAnchorElement
    const svgPhoneElement = document.getElementById('phone-btn-svg') as HTMLAnchorElement

    if (headerPhone && svgPhoneElement) {
      svgPhoneElement.href = headerPhone.href
      svgPhoneElement.textContent = headerPhone.textContent
    }
  }, [])

  useEffect(() => {
    if (isDisplayHeaderMenu) {
      const headerPhone = document.getElementById('header_phone') as HTMLAnchorElement
      const menuPhoneElement = document.getElementById('phone-btn-link') as HTMLAnchorElement
      const menuPhoneElementText = document.querySelector('.header-menu__subtitle')

      if (headerPhone && menuPhoneElement && menuPhoneElementText) {
        menuPhoneElement.href = headerPhone.href
        menuPhoneElementText.textContent = headerPhone.textContent
      }
    }
  }, [isDisplayHeaderMenu])

  useEffect(() => {
    if (isAcceptedCookie) isAcceptedCookie(isCookiesAccepted)
  }, [isCookiesAccepted])

  useEffect(() => {
    const user = localStorage.getItem('User')
    if (user !== null) {
      setIsLogin(true)
    }

    setIsCookiesAccepted(getCookie('cookiesAccepted'))
  }, [])

  const scrollDirection = (): void => {
    if (oldScrollPosition === null) {
      oldScrollPosition = window.scrollY
    }

    if (window.scrollY <= 0 || window.scrollY > oldScrollPosition) {
      setIsDisplayHeaderSwitch(false)
    } else {
      setIsDisplayHeaderSwitch(true)
    }

    oldScrollPosition = window.scrollY
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollDirection)

    return () => {
      window.removeEventListener('scroll', scrollDirection)
    }
  }, [])

  useEffect(() => {
    if (setIsFooter) setIsFooter((o: any) => !o)
  }, [isVisible])

  // useEffect(() => {
  //   const isEmail: boolean =
  //     router.query.action === 'check' || router.query.action === 'unsubscribe'
  //   const isEmailCheck: boolean = router.query.action === 'check'
  //   const isEmailUnsubscribe: boolean = router.query.action === 'unsubscribe'
  //
  //   if (!isEmail || !router.isReady) return
  //
  //   const hasUrlHash: boolean = router.asPath.includes('hash=')
  //   const hasUrlEmail: boolean = router.asPath.includes('email=')
  //   const urlHash: string | string[] | undefined = router.asPath
  //     .split(/\?/)[1]
  //     ?.replace('hash=', '')
  //     ?.split(/\&/)[0]
  //   const urlEmail: string | string[] | undefined = router.query.email
  //
  //   if (router.isReady && urlHash && urlHash !== '' && hasUrlHash) {
  //     hash.action.setHash(urlHash)
  //
  //     if (isEmailCheck) {
  //       email.action.confirmEmail(urlHash)
  //     }
  //
  //     if (isEmailUnsubscribe) {
  //       if (hasUrlEmail && urlEmail && urlEmail !== '') email.action.setEmail(urlEmail as string)
  //       modal.action.openUnsubscribeModal()
  //     }
  //   } else {
  //     router.push('/')
  //   }
  // }, [router.isReady])

  return (
    <div className="layout" id="mainLayout">
      <header className="layout__header" onClick={() => (isOpen ? setIsOpen(false) : null)}>
        <div className="header">
          <div className="header__content">
            <div className="header__company">
              <Link href="/" className="header__logo">
                <SvgIcon name="logotype-white" />
              </Link>
              <Link
                href={common.block_menu.phoneLink.link}
                id={'header_phone'}
                className="header__phone">
                {common.block_menu.phoneLink.text}
              </Link>
            </div>

            <div className="header__control">
              {/* <div className="header__lang-switcher">
                <Switcher
                  value1="ru"
                  value2="en"
                />
              </div> */}
              {!isDesktop && (
                <div className="header__icon header__icon_space-l header__icon_style_phone">
                  <Link id={'phone-btn-svg'} href={common.block_menu.phoneLink.link}></Link>
                  <SvgIcon name="phone" />
                </div>
              )}
              {/* <div className={`header__icon ${isDesktop ? 'header__icon_space-l' : ''}`}>
                <SvgIcon name="bookmark"/>
              </div>
              {
                isDesktop && <div
                  className={`header__icon header__icon_style_user ${isOpen && clientWidth >= tabletWidth ? `isOpen` : ``}`}
                  onClick={() => !isLogin ? setIsOpen(prev => !prev) : router.push('/lk/favorites')}
                >
                  <div data-cy="user" className={classes.userWrapper}>
                    {isOpen && clientWidth >= tabletWidth && <SvgIcon name="activeUser"/>}
                    {isOpen && clientWidth < tabletWidth && <Icon name="close" s='24' color='neutrals-white'/>}
                    {!isOpen && <SvgIcon name="user"/>}
                  </div>
                </div>
              } */}
              <div
                onClick={() => setIsDisplayHeaderMenu(!isDisplayHeaderMenu)}
                className="header__icon">
                {!isDisplayHeaderMenu && <SvgIcon name="burger" />}
                {isDisplayHeaderMenu && <SvgIcon name="close" />}
              </div>
            </div>
          </div>

          <div className={'header__switch' + (isDisplayHeaderSwitch ? ' is-display' : '')}>
            {activeTabHeader && (
              <div className="header-overflow">
                <div
                  className={
                    'header-overflow__left' + (activeTabHeader === 'dom' ? ' is-active' : '')
                  }></div>
                <div
                  className={
                    'header-overflow__right' + (activeTabHeader === 'office' ? ' is-active' : '')
                  }></div>
              </div>
            )}

            <div className="header__links">
              <Link
                href="/residential"
                className={
                  'header__link' + (activeTabHeader === 'office' ? ' header__link_color_gray' : '')
                }>
                {common.block_menu.residential_realestate}
              </Link>

              <Link
                href="/commercial"
                className={
                  'header__link' + (activeTabHeader === 'dom' ? ' header__link_color_gray' : '')
                }>
                {common.block_menu.commercial_realestate}
              </Link>
            </div>
          </div>
        </div>

        {mobileHeader}
      </header>

      {/*<C_AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />*/}

      <main className="layout__content">
        {isDisplayHeaderMenu && (
          <div className="layout__menu header-menu">
            <div
              onClick={() => setIsDisplayHeaderMenu(false)}
              className="header-menu__overlay"></div>

            <div className="header-menu__menu">
              <div className="header-menu__section header-menu__section_col">
                <div className="header-menu__col">
                  <div className="header-menu__title">{common.block_drop_menu.Links[0].title}</div>
                  {common.block_drop_menu.Links[0].link.map((item) => (
                    <div key={item.id} className="header-menu__list">
                      <Link href={item.link} className="header-menu__item">
                        {item.text}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="header-menu__col">
                  <div className="header-menu__title">{common.block_drop_menu.Links[1].title}</div>
                  {common.block_drop_menu.Links[1].link.map((item) => (
                    <div key={item.id} className="header-menu__list">
                      <Link href={item.link} className="header-menu__item">
                        {item.text}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="header-menu__section header-menu__section_style_switcher">
                <div className="header-menu__subtitle">Язык</div>
                <Switcher value1="ru" value2="en" />
              </div>

              <div className="header-menu__section">
                <a
                  href={common.block_menu.phoneLink.link}
                  id={'phone-btn-link'}
                  className="header-menu__link">
                  <div className="header-menu__subtitle">{common.block_menu.phoneLink.text}</div>
                  <div className="header-menu__icon">
                    <Icon name={'arrowLongRight'} s={'24'} />
                  </div>
                </a>
              </div>

              <div className="header-menu__section">
                <a href={common.block_drop_menu.EmailLink.link} className="header-menu__link">
                  <div className="header-menu__subtitle">
                    {common.block_drop_menu.EmailLink.text}
                  </div>
                  <div className="header-menu__icon">
                    <Icon name={'arrowLongRight'} s={'24'} />
                  </div>
                </a>
              </div>

              <div className="header-menu__section">
                <a href={common.block_drop_menu.TelegramLink.link} className="header-menu__link">
                  <div className="header-menu__subtitle">
                    {common.block_drop_menu.TelegramLink.text}
                  </div>
                  <div className="header-menu__icon">
                    <Icon name={'arrowLongRight'} s={'24'} />
                  </div>
                </a>
              </div>
              {/* {
                !isDesktop &&
                <Button className={classes.mobileLkbtn} s="large" variant="whiteFill" width="full" post={<Icon name="user"/>}
                  onClick={() => !isLogin ? setIsOpen(prev => !prev) : router.push('/lk/favorites')}>Войти в кабинет
                </Button>
              } */}
            </div>
          </div>
        )}

        {children}
      </main>

      {isDisplayFooter && (
        <footer ref={footerRef} className="layout__footer">
          <div className="footer">
            <div className="footer__header">
              <div className="footer__header-i">
                <div className="footer__title">{common.block_footer.get_news.header_title}</div>

                <div className="footer__description">{common.block_footer.get_news.text}</div>

                <div className="footer__button">
                  <Button
                    onClick={() => modal.action.openSubscribeModal()}
                    s="large"
                    variant="whiteStroke">
                    Подписаться
                  </Button>
                </div>
              </div>

              <div className="footer__header-i">
                <div className="footer__title">{common.block_footer.follow_us.title}</div>

                <div className="footer__description">{common.block_footer.follow_us.text}</div>

                <div className="footer__button">
                  <Button
                    onClick={() => router.push(common.block_footer.follow_us.button.link)}
                    s="large"
                    variant="whiteStroke"
                    post={<Icon name="arrowRight" />}>
                    {common.block_footer.follow_us.button.text}
                  </Button>
                </div>
              </div>
            </div>

            <div className="footer__content">
              <div className="footer__content-i-wrap">
                <div className="footer__content-i footer__content-i_style_logo">
                  <div className="footer__slogan">
                    {common.block_footer.col1.link && (
                      <Image
                        src={`https://cms.stonehedgecompany.com${common.block_footer.col1.link[1].img.data.attributes.url}`}
                        width={common.block_footer.col1.link[1]?.img?.data?.attributes?.width}
                        height={common.block_footer.col1.link[1]?.img?.data?.attributes?.height}
                        alt="slogan"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="footer__content-i-wrap">
                <div className="footer__content-i">
                  <div className="footer__subtitle">{common.block_footer.col2.title}</div>

                  <ul className="footer__list">
                    {common.block_footer.col2.link &&
                      common.block_footer.col2.link.map((linkElement) => (
                        <li key={linkElement.id} className="footer__list-i">
                          <Link className="footer__link" href={linkElement.link || '#'}>
                            {linkElement.text}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="footer__content-i-wrap">
                <div className="footer__content-i footer__content-i_style_company">
                  <div className="footer__subtitle">{common.block_footer.col3.title}</div>

                  <ul className="footer__list">
                    {common.block_footer.col3.link &&
                      common.block_footer.col3.link.map((linkElement) => (
                        <li key={linkElement.id} className="footer__list-i">
                          <Link className="footer__link" href={linkElement.link || '#'}>
                            {linkElement.text}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="footer__content-i-wrap">
                <div className="footer__content-i footer__content-i_style_contacts">
                  <div className="footer__subtitle">{common.block_footer.col4.title}</div>

                  <ul className="footer__contacts">
                    {common.block_footer.col4.link.map((linkItem) => (
                      <li key={linkItem.id} className="footer__contact">
                        <a href={linkItem.link || '#'}>{linkItem.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer__footer">
              <div className="footer__address">
                <span>г. Москва, ул. Нижняя Красносельская, д 35, стр. 9, лобби 2&emsp;</span>
                <Link href="/contacts#map">На карте</Link>
              </div>

              <div className="footer__copyright">© АО &quot;СТОУНХЕДЖ&quot;</div>
            </div>
          </div>
        </footer>
      )}

      {/*{propertyService && (*/}
      {/*  <PropertyServicesModal*/}
      {/*    isOpen={propertyService.propertyServiceState.isOpen}*/}
      {/*    emitIsOpen={(isOpen) => {*/}
      {/*      propertyService.propertyServiceState.openProperty(isOpen)*/}
      {/*    }}*/}
      {/*    emitIsGetConsultation={(isGetConsultation) => {*/}
      {/*      modal.action.setIsPropertyModalsOpen(isGetConsultation)*/}
      {/*    }}*/}
      {/*    propertyService={propertyService.propertyServiceData}*/}
      {/*  />*/}
      {/*)}*/}

      <Form.ModalType
        isOpen={modal.state.isSubscribeModalOpen}
        formType={EFormType.SUBSCRIBE}
        emitIsOpen={(isOpen) => {
          if (!isOpen) modal.action.closeSubscribeModal()
        }}
        emitSubmit={(form: { name: string; email?: string }) => {
          loading.action.setIsLoading(true)
          email.action.subscribeEmail?.(
            form as {
              name: string
              email: string
            }
          )
        }}
      />

      {/*<InfoModalS*/}
      {/*  isOpen={modal.state.isFeedbackModalSOpen}*/}
      {/*  variant={modal.state.activeFeedbackModalType}*/}
      {/*  email={email.state.email}*/}
      {/*  emitIsOpen={(isOpen) => {*/}
      {/*    modal.action.setIsFeedbackModalSOpen(isOpen)*/}
      {/*  }}*/}
      {/*/>*/}

      <Form.ModalType
        isOpen={isOpenCallbackModal ?? modal.state.isCallbackModalSOpen}
        formType={callbackModalVariation ?? modal.state.callbackModalType}
        purchaseMessage={purchaseMessage}
        emitIsOpen={(isOpen) => {
          if (toggleCallbackModal) {
            toggleCallbackModal()
          } else {
            modal.action.setIsCallbackModalSOpen(isOpen)
          }
        }}
        emitSubmit={() => {
          modal.action.openFeedbackModal(EModalVariant.REQUEST_ACCEPTED)
        }}
      />

      <Form.ModalType
        isOpen={modal.state.isPropertyModalsOpen}
        formType={EFormType.PROPERTY}
        emitIsOpen={(isOpen) => {
          modal.action.setIsPropertyModalsOpen(isOpen)
        }}
        emitSubmit={() => {
          modal.action.openFeedbackModal(EModalVariant.REQUEST_ACCEPTED)
        }}
      />

      {/*<UnsubscribeModalS*/}
      {/*  isOpen={modal.state.isUnsubscribeModalOpen}*/}
      {/*  isLoading={loading.state.isLoading}*/}
      {/*  email={email.state.email}*/}
      {/*  emitIsOpen={(isOpen) => {*/}
      {/*    if (!isOpen) {*/}
      {/*      modal.action.closeUnsubscribeModal()*/}
      {/*      router.push('/')*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  emitSubmit={(form) => {*/}
      {/*    loading.action.setIsLoading(true)*/}
      {/*    email.action.unsubscribeEmail(form)*/}
      {/*  }}*/}
      {/*/>*/}

      <div className={`layout__fixed-container`}>
        {!isVisible && (
          <CallbackButton
            links={common.block_contactUs}
            modifierClassesStyle={!isCookiesAccepted ? ['widget_with-cookies'] : ['']}
            openCallbackModal={() => {
              if (toggleCallbackModal && changeCallbackModalVariation) {
                changeCallbackModalVariation(EFormType.CALLBACK)
                toggleCallbackModal()
              } else {
                modal.action.setCallbackModalType(EFormType.CALLBACK)
                modal.action.setIsCallbackModalSOpen(true)
              }
            }}
          />
        )}
        {!isCookiesAccepted && <CookiesNotification setIsCookiesAccepted={setIsCookiesAccepted} />}
      </div>
    </div>
  )
}
