import { Box } from '../../uikit/Box'
import { LotOfficeDesktopSkeleton } from './LotOfficeDesktopSkeleton'
import { LotOfficeMobileSkeleton } from './LotOfficeMobileSkeleton'

export interface LotOfficeSkeletonProps {
  variant?: 'full' | 'short'
}

export const LotOfficeSkeleton = (props: LotOfficeSkeletonProps) => {
  return (
    <>
      <Box display_m="none">
        <LotOfficeMobileSkeleton />
      </Box>
      <Box display="none" display_m="block">
        <LotOfficeDesktopSkeleton {...props} />
      </Box>
    </>
  )
}
