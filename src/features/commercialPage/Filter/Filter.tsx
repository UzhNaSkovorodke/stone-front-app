import React, { FC, useContext, useEffect, useState } from 'react'
import classes from 'src/features/commercialPage/Filter/Filter.module.scss'
import { TabButton } from 'shared/uikit/TabButton'
import { Button } from 'shared/uikit/Button'
import { Select } from 'shared/uikit/Select'
import { InputGroupped } from 'shared/uikit/InputGroupped'
import { InputNumber } from 'shared/uikit/InputNumber'
import { Switcher } from 'shared/uikit/Switcher'
import { IFilterFormValues } from './filterForm.interface'
import { getFilterValuesFromPageData } from 'shared/utils/getFilterValuesFromPageData'
import { useFilterLots } from 'shared/hooks/useFilterLots'
import { Option } from 'src/features/catalogOffice/types/FilterFormValues'
import { IBlockFilter, IBlockMain } from 'shared/services/pageData/office/office.interface'
import { NextRouter, useRouter } from 'next/router'
import { StoreContext } from 'src/store/storeContext'
import { useFilter } from './hooks/useFilter'
import { fixNumerical } from 'shared/utils/fixNumerical'
import { Icon } from 'shared/uikit/Icon'

interface IFilterProps {
  mainInformation: IBlockMain
  filterInformation: IBlockFilter
}

interface ITab {
  label: string
  value: number
}

const TABS: ITab[] = [
  { label: 'Офисы', value: 1 },
  { label: 'Ритейл', value: 3 },
  { label: 'Крупные лоты', value: 2 },
  { label: 'Паркинг', value: 4 },
]

const DEFAULT_FILTER_VALUES: IFilterFormValues = {
  type: ['1'],
  minPrice: '',
  maxPrice: '',
  areaMin: '',
  areaMax: '',
  selected: [],
  locations: [],
  years: [],
  house: [],
}

export const Filter: FC<IFilterProps> = ({ mainInformation, filterInformation }) => {
  const router: NextRouter = useRouter()

  const [filterQueryString, setFilterQueryString] = useState(`filter[direction]=1&filter[type]=1`)
  const [defaultInitialValues, setDefaultInitialValues] =
    useState<IFilterFormValues>(DEFAULT_FILTER_VALUES)
  const [options, setOptions] = useState<Option[] | []>([])
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)
  const { filter, total, projects, correspondingProjects, allProjects, isLoading, refetch } =
    useFilterLots(filterQueryString)
  const [isPriceChanged, setisPriceChanged] = useState<boolean>(false)
  const [isAreaChanged, setIsAreaChanged] = useState<boolean>(false)
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isSelectChange, setIsSelectChange] = useState<boolean>(false)
  const [filterValues, setFilterValues] = useState<IFilterFormValues>(DEFAULT_FILTER_VALUES)
  const store = useContext(StoreContext)

  //Первая загрузка
  useEffect(() => {
    if (!isLoad) {
      setFilterValues((prevValues) => ({ ...prevValues }))
      setIsLoad(true)
    }
    refetch()
  }, [])

  useEffect(() => {
    if (isLoad) {
      if (options.length === 0) {
        // Записываем все существующие проекты
        const defaultOptions = allProjects.map((i) => {
          return { label: `${i.name}`, value: `${i.id}`, disabled: false }
        })
        setOptions(defaultOptions)
        //Записываем первые данные фильтра при дефолтном запросе
        const newFilter = getFilterValuesFromPageData(filter, allProjects, projects)

        setFilterValues((prevValues) => ({ ...prevValues, ...newFilter }))
        setDefaultInitialValues((prevValues) => ({
          ...prevValues,
          ...newFilter,
        }))
      } else {
        const newFilter = getFilterValuesFromPageData(filter, allProjects, projects)

        //Перезаписываем дефолтные данные при смене типа

        if (defaultInitialValues && filterValues.type.length !== defaultInitialValues.type.length) {
          setDefaultInitialValues({
            ...newFilter,
            ['type']: filterValues.type,
          } as any)
        }

        //Обновление фильтра при каждом запросе
        //Если выбранных проектов больше 1

        if (filterValues.selected.length > 0) {
          setFilterValues((prevValues) => ({
            ...prevValues,
            ...{
              ...newFilter,
              ['selected']: options.filter((i) => projects.includes(i.label)),
            },
          }))
        } else {
          setFilterValues((prevValues) => ({
            ...prevValues,
            ...{ ...newFilter, ['selected']: [] },
          }))
        }
      }
    }
  }, [filter])

  //fetch при изменении строки
  useEffect(() => {
    refetch()
  }, [filterQueryString, setFilterQueryString, refetch])

  //Функция изменения фильтра , срабатывает при изменении 1 из полей
  const {
    actions: { changeFilterValues },
  } = useFilter({
    filterValues,
    defaultInitialValues,
    isAreaChanged,
    isPriceChanged,
    filterQueryString,
    setFilterQueryString,
    setFilterValues,
    setIsSelectChange,
  })

  const toggleFilter = (): void => {
    setIsOpenFilter(!isOpenFilter)
  }

  const onSearchProjectClick = () => {
    const newFilter = getFilterValuesFromPageData(filter, allProjects, projects)
    store.lots.setDefaultLotValue(
      { ...newFilter, type: filterValues.type } as IFilterFormValues,
      filterQueryString,
      { ...defaultInitialValues, ['type']: filterValues.type }
    )
    router.push('/catalog/commercial')
  }
  const getContentForSelect = (countOfSelectProjects: number): string => {
    switch (countOfSelectProjects) {
      case 1:
        return `${countOfSelectProjects} проект`
      case 2:
        return `${countOfSelectProjects} проекта`
      case 3:
        return `${countOfSelectProjects} проекта`
      case 4:
        return `${countOfSelectProjects} проекта`
      default:
        return `${countOfSelectProjects} проектов`
    }
  }
  return (
    <section className={classes.section} id="top">
      <div className={`${classes.section__header} ${classes.header}`}>
        <div className={classes.header__item}>
          <div className={classes.header__icon}>
            <Icon name="office" />
          </div>
        </div>

        <div className={classes.header__item}>
          <div
            className={classes.header__title}
            dangerouslySetInnerHTML={{ __html: mainInformation.text }}></div>

          <Button
            s="medium"
            s_s="medium"
            s_l="large"
            variant="whiteStroke2"
            onClick={() => router.push('/standardsoffice')}>
            {mainInformation.button.text}
          </Button>
        </div>
      </div>

      <div className={`${classes.section__filter} ${classes.filter}`}>
        <div className={classes.filter__header}>
          <div className={classes.filter__leftSide}>
            <div className={classes.filter__title}>{filterInformation.title}</div>

            <div className={classes.filter__tabs}>
              {TABS &&
                TABS.map((tab, index) => (
                  <TabButton
                    variant="3"
                    size="medium"
                    key={index}
                    text={tab.label}
                    checked={filterValues.type.includes(tab.value.toString())}
                    onChange={changeFilterValues('type')}
                    value={tab.value}
                  />
                ))}
            </div>

            <div className={classes.filter__tabsMobile}>
              <div className={classes.label}>Тип недвижимости</div>
              <Switcher variant="blackFill" cols="2">
                {TABS &&
                  TABS.map((tab, index) => (
                    <Switcher.Item
                      key={index}
                      value={tab.value}
                      checked={filterValues.type.includes(tab.value.toString())}
                      onChange={changeFilterValues('type')}>
                      {tab.label}
                    </Switcher.Item>
                  ))}
              </Switcher>
            </div>
          </div>

          <div className={classes.filter__rightSide}>{filterInformation.text}</div>
        </div>

        <div className={classes.filter__body}>
          <div className={classes.filter__list}>
            <div className={`${classes.filter__item} ${classes.filter__item_1}`}>
              <div className={classes.label}>Цена, от-до</div>
              <InputGroupped>
                <InputNumber
                  s_s="medium"
                  s_l="large"
                  onChange={(e) => {
                    setFilterValues({
                      ...filterValues,
                      ['minPrice']: e.target.value,
                    })
                    setisPriceChanged(true)
                  }}
                  onBlur={changeFilterValues('minPrice')}
                  value={filterValues.minPrice}
                  name="minPrice"
                />
                <InputNumber
                  s_s="medium"
                  s_l="large"
                  post="₽"
                  onChange={(e) => {
                    setisPriceChanged(true)
                    setFilterValues({
                      ...filterValues,
                      ['maxPrice']: e.target.value,
                    })
                  }}
                  onBlur={changeFilterValues('maxPrice')}
                  value={filterValues.maxPrice}
                />
              </InputGroupped>
            </div>
            <div className={`${classes.filter__item} ${classes.filter__item_2}`}>
              <div className={`${classes.inputGroup} ${isOpenFilter ? classes.isOpen : ''}`}>
                <div className={`${classes.inputGroup__item} ${classes.inputGroup__item_1}`}>
                  <div className={classes.label}>Площадь, от-до</div>
                  <InputGroupped>
                    <InputNumber
                      s_s="medium"
                      s_l="large"
                      onChange={(e) => {
                        setIsAreaChanged(true)
                        setFilterValues({
                          ...filterValues,
                          ['areaMin']: e.target.value,
                        })
                      }}
                      value={filterValues.areaMin}
                      onBlur={changeFilterValues('areaMin')}
                    />
                    <InputNumber
                      s_s="medium"
                      s_l="large"
                      post="м²"
                      onChange={(e) => {
                        setIsAreaChanged(true)
                        setFilterValues({
                          ...filterValues,
                          ['areaMax']: e.target.value,
                        })
                      }}
                      value={filterValues.areaMax}
                      onBlur={changeFilterValues('areaMax')}
                    />
                  </InputGroupped>
                </div>

                <div className={`${classes.inputGroup__item} ${classes.inputGroup__item_2}`}>
                  <div className={classes.label}>Проект</div>
                  <Select
                    isMulti={true}
                    variant="blackStroke"
                    options={
                      options.map((option) => {
                        const isDisabled = correspondingProjects
                          ? correspondingProjects.includes(option.label)
                          : false
                        return { ...option, disabled: !isDisabled }
                      }) || []
                    }
                    value={filterValues.selected}
                    placeholder="Проект"
                    s_s="medium"
                    s_l="large"
                    onChange={changeFilterValues('selected')}
                    multiDisplayInputValue={
                      filterValues?.selected &&
                      getContentForSelect((filterValues?.selected as Option[]).length)
                    }
                  />
                </div>
              </div>
            </div>

            <div className={classes.toggleButton} onClick={toggleFilter}>
              <div className={classes.toggleButton__value}>
                {!isOpenFilter && <span>Развернуть&nbsp;</span>}
                {isOpenFilter && <span>Свернуть&nbsp;</span>}
                фильтры
              </div>

              <div
                className={`${classes.toggleButton__icon} ${isOpenFilter ? classes.isOpen : ''}`}>
                <Icon name="arrowDown" />
              </div>
            </div>

            <div className={`${classes.filter__item} ${classes.filter__item_3}`}>
              <Button
                className={classes.btn_filter}
                isLoading={isLoading}
                s="medium"
                s_s="medium"
                s_l="large"
                width="full"
                variant={'officeFill'}
                onClick={onSearchProjectClick}>
                {fixNumerical(total)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
