import { ReactNode } from 'react'
import { Lot } from '../../types/lots'
import { Box } from '../../uikit/Box'
import { LotOfficeDesktop } from './LotOfficeDesktop'
import { LotOfficeMobile } from './LotOfficeMobile'
import { PLACEMENT_TYPES } from '../../services/lots'
import { ILot } from '@/src/store/types/lkStore.interface'

export interface LotOfficeProps {
  lot: Lot | ILot
  isGrid?: boolean
  types: { [key: string]: string | number }
  isLocked?: boolean
  variant?: 'full' | 'short'
  buttons?: ReactNode
  iconButtons?: ReactNode
  meet?: boolean
}

export const LotOffice = (props: LotOfficeProps) => {
  return (
    <>
      <Box display_m="none">
        <LotOfficeMobile {...props} types={PLACEMENT_TYPES} />
      </Box>
      <Box display="none" display_m="block">
        <LotOfficeDesktop {...props} types={PLACEMENT_TYPES} />
      </Box>
    </>
  )
}
