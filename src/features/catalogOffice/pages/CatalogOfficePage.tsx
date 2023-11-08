import { Filter } from '../components/Filter'
import { FilterMobileModal } from '../components/FilterMobileModal'
import { FilterTabletModal } from '../components/FilterTabletModal'
import { LotOfficeLayoutModal } from '../components/LotOfficeLayoutModal'
import { NoResults } from '../components/NoResults'
import { ProjectCatalog } from '../components/ProjectCatalog'
import { PLACEHOLDER_VALUES } from '../constants/placeholderValues'
import { SORT_OPTIONS } from '../constants/sorting'
import { useFilter } from '../hooks/useFilter'
import { useSearchByLot } from '../hooks/useSearchByLot'
import { getFormFilterFromPageData } from '../lib/getFormFilterFromPageData'
import { FilterFormValues, Option } from '../types/FilterFormValues'
import { useFilterLots } from 'shared/hooks/useFilterLots'
import { MainLayout } from 'src/layouts/MainLayout'
import { ICommonResponse } from 'shared/services/pageData/common/common.interface'
import { ButtonCloseModal } from 'shared/components/ButtonCloseModal'
import { LotOfficeSkeleton } from 'shared/components/LotOfficeSkeleton'
import { MobileModalFooter } from 'shared/components/MobileModalFooter'
import { useModal } from 'shared/hooks/useModal'
import { useResponsive } from 'shared/hooks/useResponsive'
import { LOT_STATUS } from 'shared/services/lots'
import { Lot } from 'shared/types/lots'
import { Box } from 'shared/uikit/Box'
import { Button } from 'shared/uikit/Button'
import { ButtonBase } from 'shared/uikit/ButtonBase'
import { Flex } from 'shared/uikit/Flex'
import { FullscreenModal } from 'shared/uikit/FullscreenModal'
import { Icon } from 'shared/uikit/Icon'
import { MobileSelect } from 'shared/uikit/MobileSelect'
import { Select } from 'shared/uikit/Select'
import { Text } from 'shared/uikit/Text'
import { StoreContext } from 'src/store/storeContext'
import { fixNumerical } from 'shared/utils/fixNumerical'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { useIntersectionObserver } from 'react-intersection-observer-hook'
import { EFormType } from 'shared/components/Form/FormModal/FormModal'
import { DEFAULT_OPTIONS, DefaultOptions } from '../types/DefaultOptions'
import s from './CatalogOfficePage.module.scss'
import { DEFAULT_INPUTS_STATE, InitialInputsState } from '../types/DefaultStates'
import { useDefaultOptions } from '../hooks/useDefaultOptions'

interface CatalogOfficePageProps {
  common: ICommonResponse
}

const CatalogOfficePage = ({ common }: CatalogOfficePageProps) => {
  // queryStrings
  const store = useContext(StoreContext)
  //TODO: эта страница просто образец GodComponent, нужно расчистить все это
  const [filterQueryString, setFilterQueryString] = useState(
    `${
      store.lots.defaultQueryString ? store.lots.defaultQueryString.split(`&`)[0] : 'filter[type]=1'
    }&filter[direction]=1`
  )
  //Состояние изменения полей фильтра

  const [isRedirect, setIsRedirect] = useState<number>(0)

  const [inputsState, setInputsState] = useState<InitialInputsState>(DEFAULT_INPUTS_STATE)

  // filter
  const [filterValues, setFilterValues] = useState<FilterFormValues>(PLACEHOLDER_VALUES)
  const [options, setOptions] = useState<DefaultOptions>(DEFAULT_OPTIONS)
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [defaultInitialValues, setDefaultInitialValues] =
    useState<FilterFormValues>(PLACEHOLDER_VALUES)
  const [sort, setSort] = useState<Option>(SORT_OPTIONS[1])
  const [isFeatures, setIsFeatures] = useState<string[]>([])

  // Modals
  const tabletFilterModal = useModal(false)
  const mobileFilterModal = useModal(false)
  const lotLayoutModal = useModal(false)

  // Callback modal
  const callbackModal = useModal(false)
  const [modalVariation, setModalVariation] = useState<EFormType>(EFormType.RESERVATION)

  // Float button
  const [ref, { entry }] = useIntersectionObserver()
  const isFilterButtonVisible = entry && entry.isIntersecting

  // Responsive
  const isMobile = useResponsive('s')
  const isTablet = useResponsive('m')
  const isDesktop = useResponsive('l')

  //fetch
  const {
    isFetched,
    status,
    refetch,
    isLoading,
    total,
    allProjects,
    filter,
    projects,
    allBusinessTypes,
  } = useFilterLots(filterQueryString)

  const { getDefaultOptions } = useDefaultOptions(filter, store, allProjects, allBusinessTypes)
  const isNoResults = isFetched && total === 0
  const headerText =
    status === 'success' ? (isNoResults ? 'Нет результатов' : fixNumerical(total)) : ''

  const { handleSubmitSearch, isError, isLoadingSearch } = useSearchByLot()

  const [lotLayoutModalData, setLotLayoutModalData] = useState<Lot>()

  const handleOpenLotLayoutModal = (lot: Lot) => {
    setLotLayoutModalData(lot)
    lotLayoutModal.open()
  }
  useEffect(() => {
    refetch()
  }, [filterQueryString, setFilterQueryString, refetch])

  //Сброс фильтра
  const handleClearFilter = (): void => {
    setFilterQueryString('filter[direction]=1&filter[type]=1')
    const newFilter = getFormFilterFromPageData(filter, allProjects, projects)
    setFilterValues((prevValues) => ({
      ...prevValues,
      ...{
        ...newFilter,
        ['priceType']: 'common',
        ['type']: ['1'],
        isCorner: null,
        isCatering: null,
        waterPipes: null,
        decoration: null,
      },
    }))
    setIsFeatures([])
    setInputsState(DEFAULT_INPUTS_STATE)
  }

  const handleBlur = (): void => {
    //console.log(defaultInitialValues)
  }

  useEffect(() => {
    if (isLoad) {
      if (options.selected.length === 0) {
        // Записываем все существующие проекты
        const defaultOptions = getDefaultOptions()
        setOptions(defaultOptions)

        //Записываем первые данные фильтра при дефолтном запросе
        const newFilter = getFormFilterFromPageData(filter, allProjects, projects)

        setFilterValues((prevValues) => ({
          ...prevValues,
          ...{ ...newFilter, ['priceType']: 'common' },
        }))

        if (store.lots.defaultInitialValues) {
          const values = store.lots.defaultInitialValues
          setDefaultInitialValues((prevValues) => ({
            ...prevValues,
            ...{
              ...newFilter,
              ['minPrice']: values.minPrice,
              ['maxPrice']: values.maxPrice,
              ['areaMin']: values.areaMin,
              ['areaMax']: values.areaMax,
            },
          }))
        } else {
          setDefaultInitialValues((prevValues) => ({
            ...prevValues,
            ...newFilter,
          }))
        }
      } else {
        const newFilter = getFormFilterFromPageData(filter, allProjects, projects)

        //Перезаписываем дефолтные данные при смене типа
        if (defaultInitialValues && filter?.types.length !== defaultInitialValues.type.length) {
          setDefaultInitialValues({
            ...newFilter,
            ['type']: filterValues.type,
          } as any)
          setOptions({ ...options, ['house']: newFilter.house as Option[] })
        }

        //Обновление фильтра при каждом запросе
        //Если выбранных проектов больше 1

        if (filterValues.selected.length > 0) {
          setFilterValues((prevValues) => ({
            ...prevValues,
            ...{
              ...newFilter,
              ['selected']: options.selected.filter((i) => projects.includes(i.label)),
              isCorner:
                filter?.isCorner && filterValues.isCorner === '1'
                  ? '1'
                  : filterValues.isCorner === '0'
                  ? '0'
                  : null,
              isCatering:
                filter?.isCatering && filterValues.isCatering === '1'
                  ? '1'
                  : filterValues.isCatering === '0'
                  ? '0'
                  : null,
              waterPipes:
                filter?.waterPipes && filterValues.waterPipes === '1'
                  ? '1'
                  : filterValues.waterPipes === '0'
                  ? '0'
                  : null,
              decoration:
                filter?.decoration && filterValues.decoration === '1'
                  ? '1'
                  : filterValues.decoration === '0'
                  ? '0'
                  : null,
            },
          }))
        } else {
          setFilterValues((prevValues) => ({
            ...prevValues,
            ...{
              ...newFilter,
              ['selected']: [],
              isCorner:
                filter?.isCorner && filterValues.isCorner === '1'
                  ? '1'
                  : filterValues.isCorner === '0'
                  ? '0'
                  : null,
              isCatering:
                filter?.isCatering && filterValues.isCatering === '1'
                  ? '1'
                  : filterValues.isCatering === '0'
                  ? '0'
                  : null,
              waterPipes:
                filter?.waterPipes && filterValues.waterPipes === '1'
                  ? '1'
                  : filterValues.waterPipes === '0'
                  ? '0'
                  : null,
              decoration:
                filter?.decoration && filterValues.decoration === '1'
                  ? '1'
                  : filterValues.decoration === '0'
                  ? '0'
                  : null,
            },
          }))
        }
      }
    }
  }, [filter])

  //Старт страницы
  useEffect(() => {
    if (!isLoad) {
      setFilterValues((prevValues) => ({ ...prevValues }))
      setIsLoad(true)
    }
    refetch()
  }, [])

  useEffect(() => {
    setIsRedirect(isRedirect + 1)
    if (isRedirect < 2 && store?.lots?.defaultQueryString) {
      setFilterQueryString(store.lots.defaultQueryString)
      refetch()
    }
  }, [options])

  //Обработчик фильтра
  const {
    actions: { changeFilterValues, inputValueChange },
  } = useFilter({
    filterValues,
    filterQueryString,
    options,
    isFeatures,
    defaultInitialValues,
    setIsFeatures,
    setFilterQueryString,
    setFilterValues,
    inputsState,
    setInputsState,
  })

  return (
    <>
      <MainLayout
        common={common.data.attributes}
        isOpenCallbackModal={callbackModal.isOpen}
        toggleCallbackModal={callbackModal.toggle}
        callbackModalVariation={modalVariation}
        changeCallbackModalVariation={setModalVariation}
        activeTabHeader="office"
        mobileHeader={
          <Flex display_m="none" ai="center" bgColor="neutrals-white" className={s.mobileHeader}>
            <Flex className={s.mHeaderSide} jc="center">
              <ButtonBase onClick={mobileFilterModal.open} disabled={isLoading}>
                <Icon name="settings" s="16" />
              </ButtonBase>
            </Flex>
            <Flex className={s.mHeaderMiddle} jc="center">
              <Text s="12" lh="16" w="500">
                {headerText}
              </Text>
            </Flex>
            <Flex className={s.mHeaderSide} jc="center">
              <MobileSelect
                variant="blackStroke"
                value={sort}
                disabled={isLoading}
                options={SORT_OPTIONS}
                onChange={(o) => setSort(o as Option)}
                control={(onOpenOptions) => (
                  <ButtonBase onClick={onOpenOptions} disabled={isLoading}>
                    <Icon name="arrows" s="16" />
                  </ButtonBase>
                )}
              />
            </Flex>
          </Flex>
        }>
        <Flex className={s.wrapper}>
          {/* Filter sidebar */}
          <Box display="none" display_l="block" p="5" className={s.side} bgColor="neutrals-white">
            {isDesktop && (
              <Filter
                values={filterValues}
                options={options}
                filter={filter}
                features={isFeatures}
                correspondingProjects={filter?.correspondingProjects}
                onChange={changeFilterValues}
                onBlur={changeFilterValues as any}
                inputValue={inputValueChange}
                variant="narrow"
                onSubmitSearch={handleSubmitSearch}
                isError={isError}
                isLoadingSearch={isLoadingSearch}
              />
            )}
            <Box mt="4">
              <Button variant="blackStroke" onClick={handleClearFilter} width="full" s="medium">
                Сбросить
              </Button>
            </Box>
          </Box>
          {/* // Filter sidebar */}

          <Box className={s.main} p="2" p_m="5" bgColor="neutrals-gray-7">
            {/* Header */}
            <Flex display="none" display_m="flex" jc="space-between">
              <Text s="32" lh="40" w="400">
                {headerText}
              </Text>
              <Flex g="3" className={s.headerControls}>
                <Box display="none" display_m="block" display_l="none">
                  <Button
                    ref={ref}
                    onClick={tabletFilterModal.open}
                    disabled={isLoading}
                    variant="blackFill"
                    s="medium"
                    post={<Icon name="settings" />}>
                    Фильтры
                  </Button>
                </Box>
                <div className={s.sort}>
                  <Select
                    variant="blackStroke"
                    value={sort}
                    placeholder="По-умолчанию"
                    disabled={isLoading}
                    // @ts-ignore
                    options={SORT_OPTIONS}
                    onChange={(o) => setSort(o as Option)}
                  />
                </div>
              </Flex>
            </Flex>
            {/* // Header */}

            {/* Listing */}
            <Flex mt_m="5" dir="column" g="2">
              {isLoading ? (
                <ListingWrapper>
                  <LotOfficeSkeleton />
                  <LotOfficeSkeleton />
                  <LotOfficeSkeleton />
                  <LotOfficeSkeleton />
                  <LotOfficeSkeleton />
                </ListingWrapper>
              ) : isNoResults ? (
                <NoResults
                  toggleCallbackModal={callbackModal.toggle}
                  changeCallbackModalVariation={setModalVariation}
                  isOpenCallbackModal={callbackModal.isOpen}
                />
              ) : (
                allProjects
                  .filter((p) => filter?.projects.includes(p.name))
                  .map((p, i) => (
                    <ProjectCatalog
                      key={p.id}
                      project={p}
                      queryString={filterQueryString}
                      sort={sort.value}
                      onClickLayoutModal={(lot) => handleOpenLotLayoutModal(lot)}
                      isInitialOpen={i === 0}
                      toggleCallbackModal={() => {
                        setModalVariation(EFormType.RESERVATION)
                        callbackModal.toggle()
                      }}
                    />
                  ))
              )}
            </Flex>
            {/* // Listing */}
          </Box>
        </Flex>
      </MainLayout>

      {/* Filter mobile modal */}
      {isMobile && (
        <FilterMobileModal
          isOpen={mobileFilterModal.isOpen}
          onClose={mobileFilterModal.close}
          onClearFilter={handleClearFilter}
          isNoResults={isNoResults}
          total={total}>
          <Filter
            values={filterValues}
            options={options}
            filter={filter}
            features={isFeatures}
            correspondingProjects={filter?.correspondingProjects}
            onChange={changeFilterValues}
            inputValue={inputValueChange}
            onBlur={handleBlur}
            variant="narrow"
            onSubmitSearch={handleSubmitSearch}
            isError={isError}
            isLoadingSearch={isLoadingSearch}
          />
        </FilterMobileModal>
      )}
      {/* // Filter mobile modal */}

      {/* Filter tablet modal */}
      {isTablet && (
        <FilterTabletModal
          isOpen={tabletFilterModal.isOpen}
          onClose={tabletFilterModal.close}
          onClearFilter={handleClearFilter}
          isNoResults={isNoResults}
          total={total}>
          <Filter
            values={filterValues}
            options={options}
            features={isFeatures}
            filter={filter}
            correspondingProjects={filter?.correspondingProjects}
            onChange={changeFilterValues}
            onBlur={handleBlur}
            variant="wide"
            inputValue={inputValueChange}
            closeButton={
              <ButtonCloseModal
                onClick={() => {
                  if (isNoResults) handleClearFilter()
                  tabletFilterModal.close()
                }}
              />
            }
            onSubmitSearch={handleSubmitSearch}
            isError={isError}
            isLoadingSearch={isLoadingSearch}
          />
        </FilterTabletModal>
      )}
      {/* // Filter tablet modal */}

      {/* LotOffice layout modal */}
      <FullscreenModal
        isOpen={lotLayoutModal.isOpen}
        onClose={lotLayoutModal.close}
        footer={
          <MobileModalFooter variant="dark" display_m="none" g="1">
            <Button
              variant="whiteStroke"
              s="small"
              width="full"
              onClick={(e: any) => {
                e.preventDefault()
                setModalVariation(EFormType.RESERVATION)
                callbackModal.toggle()
              }}>
              Забронировать
            </Button>

            <Button
              className={s.linkButton}
              href={`/catalog/commercial/${lotLayoutModalData ? lotLayoutModalData.number : ''}`}
              variant="whiteFill"
              s="small"
              width="full">
              Подробнее
            </Button>
          </MobileModalFooter>
        }>
        <Box className={s.lotModalWrapper}>
          <LotOfficeLayoutModal
            reserv={
              lotLayoutModalData &&
              (lotLayoutModalData.status === LOT_STATUS.RESERVED ||
                lotLayoutModalData.status === LOT_STATUS.SOLD_OUT)
            }
            onClose={lotLayoutModal.close}
            lot={lotLayoutModalData}
            toggleCallbackModal={() => {
              setModalVariation(EFormType.RESERVATION)
              callbackModal.toggle()
            }}
          />
        </Box>
      </FullscreenModal>
      {/* // LotOffice layout modal */}

      {/* Floated filter button */}
      {!isFilterButtonVisible && !tabletFilterModal.isOpen && !lotLayoutModal.isOpen && (
        <Button
          onClick={tabletFilterModal.open}
          className={s.floatedButton}
          variant="whiteFill"
          s="large"
          pre={<Icon name="settings" color="neutrals-gray-4" />}>
          Фильтры
        </Button>
      )}
      {/* // Floated filter button */}
    </>
  )
}

const ListingWrapper = ({ children }: { children: ReactNode }) => (
  <Flex dir="column" g="2" g_m="1" py="4" px="2" p_m="5" rad="24" bgColor="neutrals-white">
    {children}
  </Flex>
)

export default CatalogOfficePage
