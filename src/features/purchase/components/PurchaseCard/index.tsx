import classes from './style.module.scss'
import { Dispatch, FC, SetStateAction } from 'react'

import { Flex } from 'shared/uikit/Flex'
import { Button } from 'shared/uikit/Button'
import Image from 'next/image'
import { IPurchaseCard } from 'shared/services/pageData/purchaseTerms/purchaseTerms.interface'
import { Text } from 'shared/uikit/Text'

interface Offer {
  offer: IPurchaseCard
  toggleCallbackModal: () => void
  setCardMessage: Dispatch<SetStateAction<string | undefined>>
}

const PurchaseCard: FC<Offer> = ({ offer, toggleCallbackModal, setCardMessage }) => {
  const { icon, title, characteristics, options, btn, note, messageComagic } = offer

  return (
    <Flex className={classes.root} dir="column">
      <Flex className={classes.wrapper} dir="column">
        <Image
          className={classes.icon}
          src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${icon?.data?.attributes.url}`}
          width={96}
          height={96}
          alt="characteristics"
        />
        <Text as="h2" html={`${title}`} />
        <Flex className={classes.characteristicsList} dir="column">
          {characteristics.map((c, i) => {
            return (
              <Flex className={classes.characteristicsItem} dir="row" jc="space-between" key={i}>
                <Text as="p" html={`${c.title}`} />
                <Text as="p" html={`${c.text}`} />
              </Flex>
            )
          })}
        </Flex>
        <Button
          className={classes.btn}
          s="large"
          variant="blackFill"
          onClick={() => {
            toggleCallbackModal()
            setCardMessage(`${messageComagic}`)
          }}>
          {btn}
        </Button>
        {note && note !== null && <Text as="p" html={note}></Text>}
      </Flex>
      <Flex dir="column" className={classes.optionList}>
        {options.map((o, i) => {
          return (
            <Flex className={classes.optionWrapper} dir="row" key={i}>
              <Image
                src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${o.img?.data?.attributes.url}`}
                width={24}
                height={24}
                alt={'Иконка программы'}></Image>
              <Flex className={classes.optionItem} dir="column">
                <Text as="h3" html={o.title} />
                <Text as="p" html={o.text} />
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default PurchaseCard
