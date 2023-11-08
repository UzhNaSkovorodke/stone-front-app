import { Button } from 'shared/uikit/Button'
import { Flex } from 'shared/uikit/Flex'
import { Text } from 'shared/uikit/Text'

import s from './NoResults.module.scss'
import { Dispatch } from 'react'
import { useLayoutModal } from 'shared/hooks/useLayoutModal'
import { EFormType } from 'shared/components/Form/FormModal/FormModal'

interface NoResultsProps {
  children?: React.ReactNode
  toggleCallbackModal?: () => void
  changeCallbackModalVariation?: Dispatch<EFormType>
  isOpenCallbackModal?: boolean
}

export const NoResults = ({
  toggleCallbackModal,
  changeCallbackModalVariation,
  isOpenCallbackModal,
}: NoResultsProps) => {
  const { modal } = useLayoutModal(isOpenCallbackModal ?? false)

  return (
    <Flex className={s.wrapper} jc="center" ai="center" rad="24" bgColor="neutrals-white">
      <Flex className={s.content} dir="column" ai="center">
        <Text s="20" lh="24" s_m="32" lh_m="40" w="400">
          К сожалению, по этим <br />
          критериям ничего не найдено
        </Text>
        <Text s="14" lh="20" s_m="16" lh_m="24" w="400" color="neutrals-gray-4" my="4">
          Измените запрос или обратитесь к нашим специалистам для подбора объекта
        </Text>
        <Button
          className={s.button}
          onClick={() => {
            if (toggleCallbackModal && changeCallbackModalVariation) {
              changeCallbackModalVariation(EFormType.CALLBACK)
              toggleCallbackModal()
            } else {
              modal.action.setCallbackModalType(EFormType.CALLBACK)
              modal.action.setIsCallbackModalSOpen(true)
            }
          }}
          variant="blackStroke"
          s="medium"
          s_m="large">
          Заказать обратный звонок
        </Button>
      </Flex>
    </Flex>
  )
}
