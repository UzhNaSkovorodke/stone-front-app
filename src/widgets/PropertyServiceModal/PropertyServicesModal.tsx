import React, { FC, useEffect } from 'react'
import classes from '@/components/shared/PropertyServiceModal/PropertyServiceModal.module.scss'
import SvgIcon from '@/components/shared/svgIcon/SvgIcon'
import { Icon } from '@/shared/uikit/Icon'
import { Button } from '@/shared/uikit/Button'
import { IPropertyServiceResponse } from '@/services/pageData/propertyService/propertyService.interface'
import { IDefaultCard } from '@/services/pageData/default/default.interface'
import { useInView } from 'react-intersection-observer'
import { useClientWidth } from '@/hooks/useClientWidth'

interface IPropertyServicesModalProps {
  isOpen: boolean
  emitIsOpen: (isOpen: boolean) => void
  emitIsGetConsultation: (isGetConsultation: boolean) => void
  propertyService: IPropertyServiceResponse
}

const PropertyServicesModal: FC<IPropertyServicesModalProps> = ({
  isOpen = false,
  emitIsOpen,
  emitIsGetConsultation,
  propertyService,
}) => {
  const clientWidth = useClientWidth()
  const isMobileView = clientWidth < 1024

  const { ref, inView } = useInView({
    threshold: 0,
  })
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open')
    }
  }, [isOpen])

  const services: IDefaultCard[] = propertyService.data.attributes.services

  const closeModal = () => {
    document.body.classList.remove('modal-open')
    emitIsOpen(false)
  }

  const getConsultation = () => {
    document.body.classList.remove('modal-open')
    emitIsOpen(false)
    emitIsGetConsultation(true)
  }

  if (isOpen) {
    return (
      <div className={classes.modal}>
        <div onClick={closeModal} className={classes.modal__overlay}></div>

        <div className={classes.modal__body}>
          <div className={classes.modal__header}>
            <div className={classes.modal__logo}>
              <SvgIcon name="stonelogo" />
            </div>
            <div className={classes.modal__close} onClick={closeModal}>
              <Icon s="24" name="close" />
            </div>
          </div>

          <div className={classes.modal__content}>
            <div className={classes.teaserList}>
              <div
                className={`${classes.teaserList__item} ${classes.teaserList__item_size_l} ${classes.teaserL}`}>
                <div className={classes.teaserL__body}>
                  <div className={classes.teaserL__title}>
                    {propertyService.data?.attributes.title}
                  </div>

                  <div className={classes.teaserL__description}>
                    {propertyService.data?.attributes.text}
                  </div>
                </div>

                <div className={`${classes.teaserL__button} ${inView && classes.isTransparent}`}>
                  <Button
                    onClick={getConsultation}
                    width_s="full"
                    width_m="auto"
                    s="medium"
                    s_l="large"
                    variant="whiteFill">
                    {propertyService.data?.attributes.Button?.text}
                  </Button>
                </div>
              </div>

              <div
                className={`${classes.teaserList__item} ${classes.teaser} ${classes.teaser_style_gray}`}>
                <div className={classes.teaser__header}>
                  <div className={classes.teaser__icon}>
                    <SvgIcon
                      link={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${services[0]?.img?.data?.attributes.url}`}
                    />
                  </div>

                  <div
                    className={classes.teaser__title}
                    dangerouslySetInnerHTML={{
                      __html: services[0]?.title || '',
                    }}></div>
                </div>

                <div className={classes.teaser__description}>{services[0]?.text || ''}</div>
              </div>

              <div className={`${classes.teaserList__item} ${classes.teaser}`}>
                <div className={classes.teaser__header}>
                  <div className={classes.teaser__icon}>
                    <SvgIcon
                      link={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${services[1]?.img?.data?.attributes.url}`}
                      filter={
                        isMobileView
                          ? 'invert(100%) sepia(38%) saturate(0%) hue-rotate(152deg) brightness(104%) contrast(101%)'
                          : undefined
                      }
                    />
                  </div>

                  <div
                    className={classes.teaser__title}
                    dangerouslySetInnerHTML={{
                      __html: services[1]?.title || '',
                    }}></div>
                </div>

                <div className={classes.teaser__description}>{services[1]?.text || ''}</div>
              </div>

              <div
                className={`${classes.teaserList__item} ${classes.teaser} ${classes.teaser_style_gray}`}>
                <div className={classes.teaser__header}>
                  <div className={classes.teaser__icon}>
                    <SvgIcon
                      link={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${services[2]?.img?.data?.attributes.url}`}
                    />
                  </div>

                  <div
                    className={classes.teaser__title}
                    dangerouslySetInnerHTML={{
                      __html: services[2]?.title || '',
                    }}></div>
                </div>

                <div className={classes.teaser__description}>{services[2]?.text || ''}</div>
              </div>

              <div className={`${classes.teaserList__item} ${classes.teaser}`}>
                <div className={classes.teaser__header}>
                  <div className={classes.teaser__icon}>
                    <SvgIcon
                      link={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${services[3]?.img?.data?.attributes.url}`}
                      filter={
                        isMobileView
                          ? 'invert(100%) sepia(38%) saturate(0%) hue-rotate(152deg) brightness(104%) contrast(101%)'
                          : undefined
                      }
                    />
                  </div>

                  <div
                    className={classes.teaser__title}
                    dangerouslySetInnerHTML={{
                      __html: services[3]?.title || '',
                    }}></div>
                </div>

                <div className={classes.teaser__description}>{services[3]?.text || ''}</div>
              </div>

              <div
                className={`${classes.teaserList__item} ${classes.teaser} ${classes.teaser_style_primaryOffice}`}>
                <div className={classes.teaser__header}>
                  <div className={classes.teaser__icon}>
                    <SvgIcon
                      link={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${services[4]?.img?.data?.attributes.url}`}
                    />
                  </div>

                  <div
                    className={classes.teaser__title}
                    dangerouslySetInnerHTML={{
                      __html: services[4]?.title || '',
                    }}></div>
                </div>

                <div className={classes.teaser__description}>{services[4]?.text || ''}</div>
              </div>

              <div
                className={`${classes.teaserList__item} ${classes.teaser} ${classes.teaser_style_dark}`}>
                <div className={classes.teaser__header}>
                  <div className={classes.teaser__icon}>
                    <SvgIcon
                      link={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${services[5]?.img?.data?.attributes.url}`}
                    />
                  </div>

                  <div
                    className={classes.teaser__title}
                    dangerouslySetInnerHTML={{
                      __html: services[5]?.title || '',
                    }}></div>
                </div>

                <div className={classes.teaser__description}>{services[5]?.text || ''}</div>
                <div ref={ref}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <></>
}
export default PropertyServicesModal
