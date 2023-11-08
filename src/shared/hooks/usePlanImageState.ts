import { useState } from 'react'

interface Options {
  floorPlanImage: string | null
}

export const usePlanImageState = ({ floorPlanImage }: Options) => {
  const [isMasterPlanSelected, setIsMasterPlanSelected] = useState(!floorPlanImage)

  return {
    handleSelectMasterPlan: () => setIsMasterPlanSelected(true),
    handleSelectFloorPlan: () => setIsMasterPlanSelected(false),
    isMasterPlanSelected,
  }
}
