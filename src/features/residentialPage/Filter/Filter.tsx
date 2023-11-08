import React, { FC, useState } from 'react'
import classes from 'src/features/residentialPage/Filter/Filter.module.scss'
import { Button } from 'shared/uikit/Button'
import Image from 'next/image'
import { IBlockMain, IResidentialBlockAction } from 'shared/services/pageData/dom/dom.interface'
import { NextRouter, useRouter } from 'next/router'
import ModalS from 'shared/components/ModalS/ModalS'
import { Form } from 'shared/components/Form/Form'
import { EFormType } from 'shared/components/Form/FormModal/FormModal'
import { Icon } from 'shared/uikit/Icon'

interface IFilterProps {
  mainInformation: IBlockMain
  filterInformation: IResidentialBlockAction
}

export const Filter: FC<IFilterProps> = ({ mainInformation, filterInformation }) => {
  const router: NextRouter = useRouter()

  const [isOpenFeedbackModal, setIsOpenFeedbackModal] = useState<boolean>(false)
  const [isOpenCallbackModal, setIsOpenCallbackModal] = useState<boolean>(false)
  return (
    <section className={classes.section}>
      <div className={`${classes.section__header} ${classes.header}`}>
        <div className={classes.header__item}>
          <div className={classes.header__icon}>
            <Icon name="dom" />
          </div>
        </div>

        <div className={classes.header__item}>
          <div
            className={classes.header__title}
            dangerouslySetInnerHTML={{ __html: mainInformation.text }}></div>

          <Button
            s_s="medium"
            s_l="large"
            variant="whiteStroke2"
            onClick={() => router.push('/standardsdom')}>
            {mainInformation.button.text}
          </Button>
        </div>
      </div>

      <div className={classes.plug}>
        <div className={classes.plug__content}>
          {filterInformation.img.data && (
            <Image
              width={88}
              height={80}
              className={classes.plug__img}
              src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${filterInformation.img.data.attributes.url}`}
              alt={'sds'}
            />
          )}
          <div className={classes.plug__title}>
            {filterInformation.title}
            <div className={classes.plug__note}>{filterInformation.subtext}</div>
          </div>

          <div className={classes.plug__description}>{filterInformation.text}</div>
        </div>

        <div className={classes.plug__button}>
          <Button
            s_s="medium"
            s_l="large"
            variant="domFill"
            onClick={() => setIsOpenCallbackModal(true)}>
            {filterInformation.button.text}
          </Button>
        </div>
      </div>

      <Form.ModalType
        isOpen={isOpenCallbackModal}
        formType={EFormType.WAITING_LIST}
        emitIsOpen={(isOpen) => {
          setIsOpenCallbackModal(isOpen)
        }}
        emitSubmit={(form: { phone?: string; name: string }, isOpenInfoModal) => {
          setIsOpenFeedbackModal(isOpenInfoModal)
        }}
      />

      <ModalS
        isOpen={isOpenFeedbackModal}
        emitIsOpen={(isOpen) => setIsOpenFeedbackModal(isOpen)}
        modifierClassesStyle={['modal_height_s']}>
        <div className={classes.modalContent}>
          <div className={classes.modalContent__icon}>
            <Icon name="check2" />
          </div>

          <div className={classes.modalContent__title}>Запрос принят</div>

          <div className={classes.modalContent__description}>
            Наш менеджер свяжется <br /> с вами в ближайшее время
          </div>

          <Button onClick={() => setIsOpenFeedbackModal(false)} s="large" variant="blackFill">
            Хорошо
          </Button>
        </div>
      </ModalS>
    </section>
  )
}
