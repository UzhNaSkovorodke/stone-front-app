import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../uikit/Button'
import { IconButton } from '../../uikit/IconButton'

import { LotOffice } from './index'

const args: React.ComponentProps<typeof LotOffice> = {
  lot: {
    id: 1016,
    name: 'STONE Ленинский',
    projectUuid: '6cc313ec-cf77-11eb-8346-005056a1be4c',
    address: 'Москва, ул. Вавилова, вл. 11,ССтилобат',
    features: [],
    createdAt: '2023-07-25T12:21:28.000000Z',
    updatedAt: '2023-07-25T12:21:28.000000Z',
    lotUuid: '47a3f0dd-e579-11ec-834b-005056a1be4c',
    sellingPrice: '83400000',
    sellingPricePerMeter: '1200000',
    rentPricePerMeterPerYear: '0',
    rentPricePerMonth: '0',
    discountVolume: null,
    discountedPrice: null,
    handoverKeys: null,
    availableFrom: null,
    status: 1,
    rentStatus: 1,
    number: 'SL(R)-102',
    type: 3,
    directions: null,
    entrance: '',
    doorNumber: '',
    area: '69.5',
    kitchenArea: null,
    livingArea: null,
    floorsNumber: 23,
    floor: 1,
    saleFloorMin: null,
    saleFloorMax: null,
    ceiling: null,
    roomsCount: 0,
    housing: 'Стилобат',
    section: '',
    buildStage: null,
    isCorner: false,
    isCatering: false,
    isDetachedBuilding: false,
    isPhone: false,
    isMortgage: false,
    isGarbageTube: false,
    isPenthouse: false,
    isApart: false,
    isDoubleLevel: false,
    isRamp: false,
    isCloseToLift: false,
    isOccupied: false,
    isGab: false,
    isFacing: false,
    liftPassenger: 0,
    liftService: 0,
    balcony: 0,
    loggia: 0,
    inputType: 'commonFromStreet',
    condition: '',
    decoration: '',
    layout: '',
    repairType: '',
    waterPipesCount: null,
    workPlacesCount: 0,
    combinedWcsCount: null,
    speciality: null,
    showcaseWindows: '',
    windowView: '',
    promoText: '',
    promo: [
      {
        category: 'promo',
        color: '#66a50b',
        icoImg: '/api/demo-img/features-ico/lightning.svg',
        slug: 'popularLot',
        val: 'Популярный лот',
      },
    ],
    floorPlanImg: null,
    sitPlanImg: null,
    buildingQuarter: null,
    bedromsCount: null,
    interiorPlanImg: null,
  },
  types: { Офисы: 1, Ритейл: 3, 'Офисные блоки': 2, Паркинг: 4 },
  isLocked: false,
  variant: 'full',
  buttons: (
    <Button variant="blackFill" s="small">
      Забронировать
    </Button>
  ),
  iconButtons: [
    <IconButton key={1} variant="grayStroke" icon="fullscreen" s="s" />,
    /*    <IconButton key={2} variant="grayStroke" icon="bookmark" s="s" />,*/
  ],
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LotOffice> = {
  title: 'Components/LotOffice',
  component: LotOffice,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof LotOffice>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
