import s from './LotPage.module.scss'
import { Grid } from 'shared/uikit/Grid'
import { LotDescription } from '../../components/LotDescription'
import { BcDescription } from '../../components/BcDescription'
import { PlanView } from '../../components/PlanView'
import { MobileModalFooter } from 'shared/components/MobileModalFooter'
import { Button } from 'shared/uikit/Button'
import { Icon } from 'shared/uikit/Icon'
import { Box } from 'shared/uikit/Box'
import { useResponsive } from 'shared/hooks/useResponsive'
import { Flex } from 'shared/uikit/Flex'
import { LotMoreObjects } from '../../components/LotMoreObjects'
import { LOT_STATUS } from 'shared/services/lots'
import { FC, useCallback, useState } from 'react'
import { LotCardData } from 'shared/types/lotCard'
import { ICommonResponse } from 'shared/services/pageData/common/common.interface'
import { MainLayout } from 'src/layouts/MainLayout'
import { useModal } from 'shared/hooks/useModal'
import { Form } from 'shared/components/Form/Form'
import { EFormPageType } from 'shared/components/Form/FormPage/FormPage'
import { EFormType } from 'shared/components/Form/FormModal/FormModal'

interface LotPageProps {
  lot: LotCardData
  common: ICommonResponse
}

const IS_SHOW_ADD_TO_FAVOURITES = false

export const LotPage: FC<LotPageProps> = ({ lot, common }) => {
  const isDimensionS = useResponsive('s')
  const isDimensionM = useResponsive('m')

  const callbackModal = useModal(false)
  const [modalVariation, setModalVariation] = useState<EFormType>(EFormType.RESERVATION)

  const openReservation = useCallback(() => {
    setModalVariation(EFormType.RESERVATION)
    callbackModal.toggle()
  }, [callbackModal])

  const { project } = lot
  const isSold = lot.status === LOT_STATUS.SOLD_OUT
  const isBooked = lot.status === LOT_STATUS.RESERVED

  const timeTo = lot.features ? lot.features.find((f) => f.slug === 'timeTo') : null
  const popularLot =
    !isBooked && !isSold
      ? lot.promo
        ? lot.promo?.find((f) => f.slug === 'popularLot')
        : undefined
      : undefined

  return (
    <MainLayout
      common={common.data.attributes}
      activeTabHeader="office"
      isOpenCallbackModal={callbackModal.isOpen}
      toggleCallbackModal={callbackModal.toggle}
      callbackModalVariation={modalVariation}
      changeCallbackModalVariation={setModalVariation}>
      <Grid cols="1" cols_l="2" className={s.wrapper}>
        <PlanView
          geo={project.geo}
          lotNumber={lot.number}
          azimuthAngle={lot.azimuthAngle}
          masterPlanImage={project.sitPlanImg}
          floorPlanImage={lot.floorPlanImg}
          popularLot={popularLot}
        />
        <LotDescription
          area={lot.area}
          discountVolume={lot.discountVolume}
          discountedPrice={lot.discountedPrice}
          sellingPrice={lot.sellingPrice}
          sellingPricePerMeter={lot.sellingPricePerMeter}
          typeName={lot.type}
          lotNumber={lot.number}
          features={lot.additionFeatures}
          projectFeatures={project.features}
          promo={lot.promo}
          isBooked={isBooked}
          isSold={isSold}
          openReservation={openReservation}
        />
        <div>
          <BcDescription
            address={project.address}
            title={project.name}
            metro={project.metro}
            year={project.buildingYear}
            housing={lot.housing}
            timeTo={timeTo ? timeTo : null}
            slug={project.strapiSlug}
          />
          {(lot.parking || lot.recommended) && (
            <LotMoreObjects
              parking={lot.parking}
              recommended={lot.recommended}
              isParkingLot={lot.type === 4}
              openReservation={openReservation}
            />
          )}
        </div>
      </Grid>

      <Box className={s.fixedFooter}>
        {isDimensionS ? (
          <MobileModalFooter variant="light" className={s.mobileFooter} display_m="none">
            {IS_SHOW_ADD_TO_FAVOURITES && (
              <Button variant="blackStroke" s="small" width="full" post={<Icon name="bookmark" />}>
                В избранное
              </Button>
            )}
            <Button
              variant="blackFill"
              s="small"
              width="full"
              disabled={isBooked}
              post={isBooked ? <Icon name="lock" /> : undefined}
              onClick={openReservation}>
              {isBooked ? 'Забронировано' : 'Забронировать'}
            </Button>
          </MobileModalFooter>
        ) : (
          isDimensionM && (
            <Flex className={s.desktopFooter} pb="3" jc="center">
              <Flex className={s.desktopFooterButtons}>
                {IS_SHOW_ADD_TO_FAVOURITES && (
                  <Button
                    className={s.desktopFooterButton}
                    pre={<Icon name="bookmark" />}
                    variant="whiteFill">
                    В избранное
                  </Button>
                )}

                <Button
                  className={s.desktopFooterButton}
                  disabled={isBooked}
                  variant="blackFill"
                  post={isBooked ? <Icon name="lock" /> : undefined}
                  onClick={openReservation}>
                  {isBooked ? 'Забронировано' : 'Забронировать'}
                </Button>
              </Flex>
            </Flex>
          )
        )}
      </Box>
      <Form.PageType
        formType={EFormPageType.SALES}
        formData={{
          address: project.salesOffice.address,
          buttonText: 'Записаться на встречу',
          id: 1,
          img: '',
          metro: project.salesOffice.metro,
          policyText: '',
          title: 'Офис продаж',
        }}
      />
    </MainLayout>
  )
}
