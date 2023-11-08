import React, { FC, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import classes from 'src/features/commercialDetailsPage/PlanningSolutions/PlanningSolutions.module.scss'
import { IconButton } from 'shared/uikit/IconButton'
import { FullscreenModal } from 'shared/uikit/FullscreenModal'
import { ILotData, PlanningModal } from './PlanningModal/PlanningModal'
import { TagStack } from 'shared/uikit/TagStack'
import { Tag2 } from 'shared/uikit/Tag2'
import { Button } from 'shared/uikit/Button'
import { TabButton } from 'shared/uikit/TabButton'
import { Select } from 'shared/uikit/Select'
import { MiniZoomPan } from './ZoomPan/MiniZoomPan'
import { ButtonBase } from 'shared/uikit/ButtonBase'
import { Icon } from 'shared/uikit/Icon'
import { Option } from 'src/features/catalogOffice/types/FilterFormValues'
import { SORT_OPTIONS } from 'src/features/catalogOffice/constants/sorting'
import { Lot } from 'shared/types/lots'
import { useQuery } from '@tanstack/react-query'
import { getLots } from 'shared/services/lots'
import { LotOffice } from 'shared/components/LotOffice'
import { LotOfficeSkeleton } from 'shared/components/LotOfficeSkeleton'
import { formatPrice } from 'shared/utils/formatPrice'
import { useInView } from 'react-intersection-observer'
import { QUERYKEYS } from 'shared/constants/queryKeys'
import { Loader } from 'shared/uikit/Loader'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import { StoreContext } from 'src/store/storeContext'
import { fixNumerical } from 'shared/utils/fixNumerical'

interface IPlanningSolutionsProps {
  projectId: string
  projectName: string | null
  sectionTitle: string | null
}

enum EPlanningTab {
  OFFICE = '1,2',
  RITEIL = '3',
}

const DESKTOP_CLIENT = 1440

export const PlanningSolutions: FC<IPlanningSolutionsProps> = ({
  projectId,
  projectName,
  sectionTitle,
}) => {
  const [sort, setSort] = useState<Option>(SORT_OPTIONS[1])
  const [page, setPage] = useState<number>(1)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [detailInfoLot, setDetailInfoLot] = useState<Lot>()
  const [activePlanningTab, setActivePlanningTab] = useState<EPlanningTab>(EPlanningTab.OFFICE)
  const [filterQueryString, setFilterQueryString] = useState(
    `filter[type]=1,2&filter[project_uuid]=${projectId}&sort=${sort.value}&page=${page}`
  )
  const [lotsList, setLotsList] = useState<Lot[]>([])
  const [lotsForMobile, setLotsForMobile] = useState<Lot[]>([])

  const router = useRouter()
  const store = useContext(StoreContext)

  const onSearchProjectClick = () => {
    store.lots.setDefaultLotValue(null, filterQueryString, null)
    router.push('/catalog/commercial')
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERYKEYS.infiniteLots],
    queryFn: () => getLots(filterQueryString),
    refetchOnWindowFocus: true,
    staleTime: Infinity,
    enabled: true,
  })

  const { ref, inView } = useInView({
    threshold: 0.1,
  })

  const clientWidth = useClientWidth()

  const lots: Lot[] = data?.data || []
  const total: number | undefined = data?.meta.total
  const lastPage: number | undefined = data?.meta.lastPage

  const price: string =
    detailInfoLot && detailInfoLot.sellingPrice
      ? formatPrice(parseFloat(detailInfoLot.sellingPrice))
      : '-'
  const pricePerMeter: string =
    detailInfoLot && detailInfoLot.sellingPricePerMeter
      ? formatPrice(parseFloat(detailInfoLot.sellingPricePerMeter))
      : '-'

  const overlayRef = React.createRef<HTMLDivElement>()
  let timeoutId: ReturnType<typeof setTimeout>

  const handleMouseEnter = (): void => {
    timeoutId = setTimeout(hideOverlay, 5000)
  }

  const hideOverlay = (): void => {
    overlayRef?.current && (overlayRef.current.style.display = 'none')
  }

  const getFloor = (): string => {
    return detailInfoLot?.floor && detailInfoLot?.floorsNumber
      ? `${detailInfoLot.floor} из ${detailInfoLot.floorsNumber}`
      : detailInfoLot?.floor
      ? String(detailInfoLot.floor)
      : ''
  }

  const getLotDataForPlanning = (): ILotData => {
    return {
      areaPrice: price,
      squarePrice: pricePerMeter,
      tags: detailInfoLot?.features?.map((feature) => feature.val) || [],
      // @ts-ignore todo: revgenov неправильные типы из каталога
      type: detailInfoLot?.type.toString() || '',
      lot: detailInfoLot?.number || '',
      name: detailInfoLot?.housing || '',
      floor: detailInfoLot?.floor ? getFloor() : '',
      area: detailInfoLot?.area || '',
      pic: `${detailInfoLot?.floorPlanImg || ''}`,
      total: total && detailInfoLot ? total : undefined,
    }
  }

  const switchPlanningType = (tab: EPlanningTab): void => {
    if (tab === activePlanningTab) return
    setActivePlanningTab(tab)
  }

  useEffect(() => {
    refetch()
  }, [filterQueryString, refetch])

  useEffect(() => {
    setPage(1)
    setFilterQueryString(
      `filter[type]=${activePlanningTab}&filter[project_uuid]=${projectId}&sort=${sort.value}&page=1`
    )
  }, [activePlanningTab])

  useEffect(() => {
    if (page === lastPage) {
      return
    }

    if (inView) {
      setPage((prev) => prev + 1)
    }
  }, [inView])

  useEffect(() => {
    if (activePlanningTab === EPlanningTab.OFFICE) {
      setFilterQueryString(
        `filter[type]=1,2&filter[project_uuid]=${projectId}&sort=${sort.value}&page=${page}`
      )
    } else {
      setFilterQueryString(
        `filter[type]=3&filter[project_uuid]=${projectId}&sort=${sort.value}&page=${page}`
      )
    }
  }, [page])

  useEffect(() => {
    if (lots && lots.length > 0) {
      if (page === 1) {
        setDetailInfoLot(lots[0])
        setLotsList(lots)
        setLotsForMobile(lots)
      }
      if (page > 1) {
        setLotsList([...lotsList, ...lots])
      }
    }
  }, [lots])

  return (
    <div className={classes.section}>
      <div className={`${classes.section__list} ${classes.list}`}>
        <div className={classes.list__header}>
          <div className={classes.list__title}>{sectionTitle}</div>

          <div className={classes.list__note}>
            <span dangerouslySetInnerHTML={{ __html: projectName || '' }}></span>
          </div>

          <div className={classes.list__bar}>
            <div className={classes.list__tabs}>
              <TabButton
                checked={activePlanningTab === EPlanningTab.OFFICE}
                variant="3"
                size="medium"
                text={'Офис'}
                onClick={() => {
                  switchPlanningType(EPlanningTab.OFFICE)
                }}
              />
              {projectName !== 'STONE Ходынка' && (
                <TabButton //TODO: selivanov Скрыли ритейл для Ходынки, так как количестов лотов (0) мы узнаем только после запроса
                  checked={activePlanningTab === EPlanningTab.RITEIL}
                  variant="3"
                  size="medium"
                  text={'Ритейл'}
                  onClick={() => {
                    switchPlanningType(EPlanningTab.RITEIL)
                  }}
                />
              )}
            </div>

            <div className={classes.list__select}>
              <Select
                variant="blackStroke"
                value={sort}
                placeholder="По-умолчанию"
                // @ts-ignore
                options={SORT_OPTIONS}
                onChange={(option) => {
                  setSort(option as Option)
                  setPage(1)
                  setFilterQueryString(
                    `filter[type]=${
                      activePlanningTab === EPlanningTab.OFFICE ? '1,2' : '3'
                    }&filter[project_uuid]=${projectId}&sort=${option?.value}&page=1`
                  )
                }}
              />
            </div>

            <div className={classes.list__sorting}>
              <ButtonBase>
                <Icon s="24" name="arrows" />
              </ButtonBase>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className={classes.list__list}>
            <LotOfficeSkeleton />
            <LotOfficeSkeleton />
            <LotOfficeSkeleton />
            <LotOfficeSkeleton />
            <LotOfficeSkeleton />
          </div>
        ) : (
          <div className={classes.list__list}>
            {clientWidth >= DESKTOP_CLIENT &&
              lotsList.map((lot, index) => (
                <div
                  onClick={() => {
                    setDetailInfoLot(lot)
                  }}
                  key={index}>
                  <LotOffice
                    lot={lot}
                    variant="short"
                    types={{
                      'Офисные блоки': 2,
                      Офисы: 1,
                      Паркинг: 4,
                      Ритейл: 3,
                    }}
                  />
                </div>
              ))}
            {lotsList.length > 0 && <div ref={ref} className={classes.observe}></div>}
            {clientWidth < DESKTOP_CLIENT &&
              lotsForMobile.map((lot, index) => (
                <div
                  onClick={() => {
                    setDetailInfoLot(lot)
                  }}
                  key={index}>
                  <LotOffice
                    lot={lot}
                    variant="short"
                    types={{
                      'Офисные блоки': 2,
                      Офисы: 1,
                      Паркинг: 4,
                      Ритейл: 3,
                    }}
                    iconButtons={[
                      <IconButton
                        key={1}
                        variant="grayStroke"
                        icon="fullscreen"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault()
                          setShowModal(true)
                        }}
                        s={'m'}
                      />,
                    ]}
                  />
                </div>
              ))}
          </div>
        )}

        <div className={classes.list__button}>
          <Button
            width="full"
            width_m="auto"
            s="medium"
            variant="blackFill"
            onClick={() => {
              onSearchProjectClick()
            }}>
            {fixNumerical(total)}
          </Button>
        </div>
      </div>

      <div className={`${classes.section__view} ${classes.view}`}>
        <div className={`${classes.view__header} ${classes.header}`}>
          <div className={classes.header__title}>
            {price} ₽<span> {pricePerMeter} ₽/м²</span>
          </div>

          <div className={classes.header__buttons}>
            {/* <div className={classes.header__button}> // Избраннное будет добавлено в следующей итерации
                <IconButton variant="grayStroke" icon={"bookmark"}/>
              </div> */}

            <div className={classes.header__button} onClick={() => setShowModal(true)}>
              <IconButton variant="grayStroke" icon={'fullscreen'} />
            </div>
          </div>
        </div>

        <div className={classes.view__tags}>
          <TagStack size="large" className={classes.tags_flexWrap}>
            {detailInfoLot?.features &&
              detailInfoLot?.features.map((feature) => (
                <Tag2 key={feature.val}>{feature.val}</Tag2>
              ))}
          </TagStack>
        </div>

        <div className={classes.view__zoomContainer}>
          <div
            ref={overlayRef}
            className={classes.view__overlay}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => clearTimeout(timeoutId)}
            onMouseDown={hideOverlay}>
            Перемещайтесь по плану, <br /> зажав левую кнопку мыши
          </div>

          <MiniZoomPan src={detailInfoLot?.floorPlanImg || ''} />
        </div>

        {total && total >= lots.length && (
          <Button
            onClick={() => {
              onSearchProjectClick()
            }}
            width="full"
            s="large">
            {fixNumerical(total)}
          </Button>
        )}

        {isLoading && (
          <div className={classes.loader__overlay}>
            <Loader s="24" color="primary-stone" />
          </div>
        )}
      </div>

      <FullscreenModal
        className={classes.modal}
        isOpen={showModal}
        onClose={() => {
          console.log()
        }}>
        <PlanningModal
          onClose={() => {
            console.log()
          }}
          closeModal={setShowModal}
          lotData={getLotDataForPlanning()}
          searchProjectClick={onSearchProjectClick}
          fixNumerical={fixNumerical}
        />
      </FullscreenModal>
    </div>
  )
}
