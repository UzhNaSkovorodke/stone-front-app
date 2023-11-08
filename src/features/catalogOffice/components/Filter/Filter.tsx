import { Switcher } from '../../../../shared/uikit/Switcher'
import { FilterFormValues, Option } from '../../types/FilterFormValues'
import s from './Filter.module.scss'
import { CheckboxTiny } from 'src/shared/uikit/CheckboxTiny'
import { BusinessTypes, LotPageData } from 'shared/types/lots'
import { Box } from 'shared/uikit/Box'
import { Button } from 'shared/uikit/Button'
import { ButtonBase } from 'shared/uikit/ButtonBase'
import { DisableWrapper } from 'shared/uikit/DisableWrapper'
import { Flex } from 'shared/uikit/Flex'
import { FormField } from 'shared/uikit/FormField'
import { Grid } from 'shared/uikit/Grid'
import { Icon } from 'shared/uikit/Icon'
import { Input } from 'shared/uikit/Input'
import { InputGroupped } from 'shared/uikit/InputGroupped'
import { InputNumber } from 'shared/uikit/InputNumber'
import { Popover } from 'shared/uikit/Popover'
import { Select } from 'shared/uikit/Select'
import { TabButton } from 'shared/uikit/TabButton'
import { Text } from 'shared/uikit/Text'
import { withStyles } from '@bruitt/classnames'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { OnChange } from 'shared/uikit/Select/types'
import { DefaultOptions } from '../../types/DefaultOptions'

const sx = withStyles(s)

interface FilterProps {
  variant: 'narrow' | 'wide'
  closeButton?: ReactNode
  values: FilterFormValues
  options: DefaultOptions
  onChange: (
    field: keyof FilterFormValues
  ) => (e: ChangeEvent<HTMLInputElement> | Option | Option[]) => unknown
  onBlur: (e: ChangeEvent<HTMLInputElement>) => unknown
  // search by lot
  onSubmitSearch: (s: string) => void
  isError: boolean
  isLoadingSearch: boolean
  businessTypes?: BusinessTypes
  correspondingProjects?: string[]
  inputValue: (e: ChangeEvent<HTMLInputElement>, field: string) => void
  features: string[]
  filter?: LotPageData
}

export const Filter = ({
  variant,
  closeButton,
  values,
  options,
  filter,
  // features,
  inputValue,
  onChange,
  onSubmitSearch,
  isError,
  isLoadingSearch,
  correspondingProjects,
}: FilterProps) => {
  const [lotNumber, setLotNumber] = useState('')
  const handleChageSearch = (e: ChangeEvent<HTMLInputElement>) => setLotNumber(e.target.value)
  // const bTypes = useMemo(
  //   () =>
  //     Object.entries(businessTypes).reduce<{ [key: string]: string }>((r, [k, v]) => {
  //       r[v] = k
  //       return r
  //     }, {}),
  //   [businessTypes],
  // )
  useEffect(() => {
    //f
  }, [filter])
  return (
    <DisableWrapper isDisabled={false}>
      <Box>
        <Flex
          ai="center"
          jc="space-between"
          mb="4"
          mb_m="5"
          mb_l="4"
          w="wrap"
          w_m={variant === 'narrow' ? 'wrap' : 'nowrap'}
          rg="4">
          <Text className={s.headerItem} s="24" lh="32" w="400">
            Фильтры
          </Text>
          {/* <Flex className={sx(s.type, s.headerItem, { variant })} jc="center">
            <Tabs width={variant === 'narrow' ? 'full' : 'auto'}>
              <Tabs.Item defaultChecked name="property">
                Dom
              </Tabs.Item>
              <Tabs.Item name="property">Office</Tabs.Item>
            </Tabs>
          </Flex> */}
          <Flex className={s.headerItem} g="3" jc="flex-end">
            <Flex className={s.search} ai="center" g="1" color="neutrals-gray-4">
              <Icon name="search" s="20" />
              <Popover
                render={({ toggle }) => (
                  <ButtonBase onClick={toggle}>
                    <Text s="14" lh="20" w="400" color="neutrals-gray-4">
                      Поиск по лоту
                    </Text>
                  </ButtonBase>
                )}
                content={() => (
                  <Box pt="4" px="4" pb="2">
                    <Flex g="1" ai="flex-end">
                      <FormField htmlFor="" label="Номер лота">
                        <Input
                          placeholder="Введите номер"
                          value={lotNumber}
                          onChange={handleChageSearch}
                        />
                      </FormField>
                      <Button
                        disabled={!lotNumber}
                        isLoading={isLoadingSearch}
                        onClick={() => onSubmitSearch(lotNumber)}
                        s="medium"
                        variant="blackFill">
                        Найти
                      </Button>
                    </Flex>

                    <Text s="12" lh="16" pl="3" color="secondary-red">
                      {isError ? 'лот не найден' : '\xa0'}
                    </Text>
                  </Box>
                )}
              />
            </Flex>
            {closeButton}
          </Flex>
        </Flex>

        <form id="filter">
          <Box mb={variant === 'narrow' ? '4' : '3'}>
            <FormField label="Тип помещения">
              <Switcher cols={variant === 'narrow' ? '2' : '4'}>
                <Switcher.Item
                  name="type"
                  checked={values.type.includes('1')}
                  onChange={
                    values.type.length === 1 && values.type.includes('1')
                      ? () => null
                      : onChange('type')
                  }
                  value="1">
                  Офисы
                </Switcher.Item>
                <Switcher.Item
                  name="type"
                  checked={values.type.includes('3')}
                  onChange={
                    values.type.length === 1 && values.type.includes('3')
                      ? () => null
                      : onChange('type')
                  }
                  value="3">
                  Ритейл
                </Switcher.Item>
                <Switcher.Item
                  name="type"
                  checked={values.type.includes('2')}
                  onChange={
                    values.type.length === 1 && values.type.includes('2')
                      ? () => null
                      : onChange('type')
                  }
                  value="2">
                  Крупные лоты
                </Switcher.Item>
                <Switcher.Item
                  name="type"
                  checked={values.type.includes('4')}
                  onChange={
                    values.type.length === 1 && values.type.includes('4')
                      ? () => null
                      : onChange('type')
                  }
                  value="4">
                  Паркинг
                </Switcher.Item>
              </Switcher>
            </FormField>
          </Box>

          <Grid
            cols={variant === 'narrow' ? '1' : '2'}
            rg={variant === 'narrow' ? '4' : '3'}
            cg="6">
            <FormField label="Цена, от-до" className={s.posRel}>
              {values?.priceType === 'common' ? (
                <InputGroupped>
                  <InputNumber
                    key="minPrice"
                    name="minPrice"
                    value={values.minPrice}
                    decimalScale={2}
                    onChange={(e) => inputValue(e, 'minPrice')}
                    onBlur={onChange('minPrice')}
                  />
                  <InputNumber
                    key="maxPrice"
                    name="maxPrice"
                    post="₽"
                    value={values.maxPrice}
                    decimalScale={2}
                    onChange={(e) => inputValue(e, 'maxPrice')}
                    onBlur={onChange('maxPrice')}
                  />
                </InputGroupped>
              ) : (
                <InputGroupped>
                  <InputNumber
                    key="minMeterPrice"
                    name="minMeterPrice"
                    value={values.minMeterPrice}
                    decimalScale={2}
                    onChange={(e) => inputValue(e, 'minMeterPrice')}
                    onBlur={onChange('minMeterPrice')}
                  />
                  <InputNumber
                    key="maxMeterPrice"
                    name="maxMeterPrice"
                    post="₽"
                    value={values.maxMeterPrice}
                    decimalScale={2}
                    onChange={(e) => inputValue(e, 'maxMeterPrice')}
                    onBlur={onChange('maxMeterPrice')}
                  />
                </InputGroupped>
              )}

              <Flex g="1" className={s.priceType}>
                <CheckboxTiny
                  name="priceType"
                  value="common"
                  onChange={onChange('priceType')}
                  text="Общая"
                  checked={values.priceType === 'common'}
                />
                <CheckboxTiny
                  name="priceType"
                  value="metre"
                  onChange={onChange('priceType')}
                  text="м²"
                  checked={values.priceType === 'metre'}
                />
              </Flex>
            </FormField>

            <FormField label="Локация">
              <Select
                isMulti
                variant="blackStroke"
                name="location"
                value={values.locations}
                placeholder="Выберите метро"
                onChange={onChange('locations') as OnChange<Option>}
                // onBlur={onChange('locations')}
                options={options.locations}
                multiDisplayInputValue={
                  values?.locations && `Выбрано ${(values?.locations as Option[]).length} метро`
                }
              />
            </FormField>

            <FormField label="Площадь, от-до">
              <InputGroupped>
                <InputNumber
                  name="areaMin"
                  decimalScale={1}
                  value={values.areaMin}
                  onChange={(e) => inputValue(e, 'areaMin')}
                  onBlur={onChange('areaMin')}
                />
                <InputNumber
                  name="areaMax"
                  decimalScale={1}
                  post="м²"
                  value={values.areaMax}
                  onChange={(e) => inputValue(e, 'areaMax')}
                  onBlur={onChange('areaMax')}
                />
              </InputGroupped>
            </FormField>

            <FormField label="Готовность">
              <Select
                isMulti={true}
                name="years"
                variant="blackStroke"
                options={options.years as Option[]}
                value={values.years as Option[]}
                placeholder="Выберите год"
                onChange={onChange('years') as OnChange<Option>}
                multiDisplayInputValue={
                  values?.years && values?.years && `Выбрано ${(values?.years as Option[]).length}`
                }
              />
            </FormField>

            <FormField label="Проект">
              <Select
                isMulti={true}
                variant="blackStroke"
                options={
                  options.selected.map((option) => {
                    const isDisabled = correspondingProjects
                      ? correspondingProjects.includes(option.label)
                      : false
                    return { ...option, disabled: !isDisabled }
                  }) || []
                }
                value={values.selected}
                placeholder="Проект"
                onChange={onChange('selected') as OnChange<Option>}
                multiDisplayInputValue={
                  values?.selected &&
                  `Выбрано ${(values?.selected as Option[]).length} проекта (-ов)`
                }
              />
            </FormField>

            <FormField label="Башня/корпус">
              <Select
                isMulti={true}
                variant="blackStroke"
                options={options.house as Option[]}
                value={values.house as Option[]}
                placeholder="Выберите"
                onChange={onChange('house') as OnChange<Option>}
                multiDisplayInputValue={
                  values?.house && `Выбрано ${(values?.house as Option[]).length} корпуса (-ов)`
                }
              />
            </FormField>

            <FormField label="Этаж, от-до">
              <InputGroupped>
                <InputNumber
                  name="minFloor"
                  allowNegative={true}
                  value={values.minFloor}
                  // onChange={onChange('minFloor')}
                  onBlur={onChange('minFloor')}
                />
                <InputNumber
                  name="maxFloor"
                  value={values.maxFloor}
                  // onChange={onChange('maxFloor')}
                  onBlur={onChange('maxFloor')}
                />
              </InputGroupped>
            </FormField>

            <FormField label="Количество рабочих мест, от-до">
              <InputGroupped>
                <InputNumber
                  name="minWorkPlacesCount"
                  value={values.minWorkPlacesCount}
                  // onChange={onChange('minWorkPlacesCount')}
                  onBlur={onChange('minWorkPlacesCount')}
                />
                <InputNumber
                  name="maxWorkPlacesCount"
                  value={values.maxWorkPlacesCount}
                  // onChange={onChange('maxWorkPlacesCount')}
                  onBlur={onChange('maxWorkPlacesCount')}
                />
              </InputGroupped>
            </FormField>

            <Box>
              <Flex className={s.additional} jc="space-between" ai="center" pb="2">
                <Text s="12" lh="16" w="400">
                  Угловое
                </Text>
                <Flex className={s.tabWrapper}>
                  <TabButton
                    name="isCorner"
                    onChange={onChange('isCorner')}
                    value="1"
                    checked={values.isCorner === '1'}
                    disabled={filter && !filter.isCorner}
                    size="small"
                    text="Да"
                    variant="3"
                  />
                  <TabButton
                    name="isCorner"
                    value="0"
                    onChange={onChange('isCorner')}
                    checked={values.isCorner === '0'}
                    disabled={filter && filter.disableNoButton.isCorner}
                    size="small"
                    text="Нет"
                    variant="3"
                  />
                </Flex>
              </Flex>

              <Flex className={sx(s.additional, { variant })} jc="space-between" ai="center" pt="2">
                <Text s="12" lh="16" w="400">
                  Отделка
                </Text>
                <Flex className={s.tabWrapper}>
                  <TabButton
                    name="decoration"
                    value={1}
                    onChange={onChange('decoration')}
                    checked={values.decoration === '1'}
                    disabled={filter && !filter.decoration}
                    size="small"
                    text="Да"
                    variant="3"
                  />
                  <TabButton
                    name="decoration"
                    value={0}
                    onChange={onChange('decoration')}
                    checked={values.decoration === '0'}
                    disabled={filter && filter.disableNoButton.decoration}
                    size="small"
                    text="Нет"
                    variant="3"
                  />
                </Flex>
              </Flex>
            </Box>

            <Box>
              <Flex className={s.additional} jc="space-between" ai="center" pb="2">
                <Text s="12" lh="16" w="400">
                  Мокрая точка
                </Text>
                <Flex className={s.tabWrapper}>
                  <TabButton
                    name="waterPipes"
                    value={1}
                    onChange={onChange('waterPipes')}
                    checked={values.waterPipes === '1'}
                    disabled={filter && !filter.waterPipes}
                    size="small"
                    text="Да"
                    variant="3"
                  />
                  <TabButton
                    name="waterPipes"
                    value={0}
                    onChange={onChange('waterPipes')}
                    checked={values.waterPipes === '0'}
                    disabled={filter && filter.disableNoButton.waterPipes}
                    size="small"
                    text="Нет"
                    variant="3"
                  />
                </Flex>
              </Flex>

              <Flex className={s.additional} jc="space-between" ai="center" pt="2">
                <Text s="12" lh="16" w="400">
                  Под общепит
                </Text>
                <Flex className={s.tabWrapper}>
                  <TabButton
                    name="isCatering"
                    value={1}
                    onChange={onChange('isCatering')}
                    checked={values.isCatering === '1'}
                    disabled={filter && !filter.isCatering}
                    size="small"
                    text="Да"
                    variant="3"
                  />
                  <TabButton
                    name="isCatering"
                    value={0}
                    onChange={onChange('isCatering')}
                    checked={values.isCatering === '0'}
                    disabled={filter && filter.disableNoButton.isCatering}
                    size="small"
                    text="Нет"
                    variant="3"
                  />
                </Flex>
              </Flex>
            </Box>

            {/* <FormField htmlFor="" label="Особенности">
              <Flex className={s.tabWrapper} w="wrap">
                {options.features &&
                  options.features.map((f: any) => (
                    <TabButton
                      key={f.label}
                      name="features"
                      value={f.value}
                      onChange={onChange('features')}
                      checked={features.includes(f.label)}
                      disabled={f.disabled}
                      size="small"
                      text={f.label}
                      type="checkbox"
                      variant="3"
                    />
                  ))}
              </Flex>
            </FormField> */}

            {/* <FormField htmlFor="" label="Дополнительные сервисы">
              <Flex className={s.tabWrapper}>
                {(options.businessType as string[]).map((f: any) => (
                  <TabButton
                    key={f.label}
                    name="businessType"
                    value={f.value}
                    onChange={onChange('businessType')}
                    checked={values.businessType.includes(f.label)}
                    disabled={f.disabled}
                    size="small"
                    text={f.label}
                    type="checkbox"
                    variant="3"
                  />
                ))}
              </Flex>
            </FormField> */}
          </Grid>
        </form>
      </Box>
    </DisableWrapper>
  )
}
