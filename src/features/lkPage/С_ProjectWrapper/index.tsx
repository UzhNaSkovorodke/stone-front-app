import C_SelectContent from '../C_SelectContent'
import { ProjectGroup } from 'src/features/catalogOffice/components/ProjectGroup'
import { useModal } from 'shared/hooks/useModal'
import { SectionsType } from 'src/store/types/lkStore.interface'
import { Dispatch, SetStateAction } from 'react'

export default function C_ProjectWrapper({
  reserv,
  onClickLayoutModal,
  activeMenu,
  elem,
  onClickHandler,
  typeContent,
}: {
  onClickLayoutModal: any
  typeContent: 'DOM' | 'OFFICE'
  activeMenu: string
  elem: SectionsType
  reserv: Dispatch<SetStateAction<boolean>>
  onClickHandler: () => void
}) {
  const { isOpen, toggle } = useModal(false)

  return (
    <ProjectGroup project={elem[0].lot.project} isOpen={isOpen} toggle={toggle}>
      <C_SelectContent
        activeMenu={activeMenu}
        reserv={reserv}
        onClickLayoutModal={onClickLayoutModal}
        lots={elem}
        onClickHandler={onClickHandler}
        typeContent={typeContent}
      />
    </ProjectGroup>
  )
}
