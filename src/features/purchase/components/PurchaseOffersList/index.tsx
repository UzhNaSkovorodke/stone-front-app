import React, { Dispatch, FC, SetStateAction } from 'react'
import classes from './style.module.scss'
import PurchaseCard from '../PurchaseCard'
import { Box } from 'shared/uikit/Box'
import { Flex } from 'shared/uikit/Flex'
import { IPurchaseCard } from 'shared/services/pageData/purchaseTerms/purchaseTerms.interface'

interface Offers {
  offers: IPurchaseCard[]
  toggleCallbackModal: () => void
  setCardMessage: Dispatch<SetStateAction<string | undefined>>
}

const PurchaseOffersList: FC<Offers> = ({ offers, toggleCallbackModal, setCardMessage }) => {
  return (
    <Box className={classes.root}>
      <Flex className={classes.list} dir="row" jc="space-between" w="wrap" g="1">
        {offers.map((offer: IPurchaseCard, i: number) => {
          return (
            <PurchaseCard
              key={i}
              offer={offer}
              toggleCallbackModal={toggleCallbackModal}
              setCardMessage={setCardMessage}
            />
          )
        })}
      </Flex>
    </Box>
  )
}

export default PurchaseOffersList
