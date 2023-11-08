import { Text } from 'shared/uikit/Text'
import { ReserveLotDescription } from 'src/features/reservations/components/ReserveLotDescription'
import { ReservationsFooter } from 'src/features/reservations/components/ReservationsFooter'
import React from 'react'
import { Stages } from 'src/features/reservations/types/types'
import classes from './StageAgreement.module.scss'
import { ReservationsTop } from 'src/features/reservations/components/ReservationsTop'
import { ReservationsHeader } from 'src/features/reservations/components/ReservationsHeader'

interface StageAgreement {
  setStage: React.Dispatch<React.SetStateAction<Stages>>
}

export function StageAgreement({ setStage }: StageAgreement) {
  return (
    <>
      <ReservationsTop>
        <ReservationsHeader text={'Бронирование'} />
        <div className={classes.lotDescription}>
          <ReserveLotDescription />
        </div>
        <Text
          className={classes.subHeader}
          s={'20'}
          w={'400'}
          align={'center'}
          lh={'32'}
          color="neutrals-white">
          Внимательно ознакомьтесь с представленной информацией и примите условия Оферты
        </Text>

        <div className={classes.agreementWrapper}>
          <Text className={classes.agreement} s={'14'} w={'400'} lh={'20'} color="neutrals-gray-5">
            1. Общие положения 1.1. Настоящий Договор является официальным предложением (публичной
            офертой) Фамилия, имя, отчество/Название организации/Название магазина (в дальнейшем
            «Исполнитель») для полностью дееспособного физического (далее – «Заказчик»), которое
            примет настоящее предложение, на указанных ниже условиях. 1.2. В соответствии с пунктом
            2 статьи 437 Гражданского Кодекса Российской Федерации (ГК РФ), в случае принятия
            изложенных ниже условий и оплаты услуг юридическое или физическое лицо, производящее
            акцепт этой оферты, становится Заказчиком (в соответствии с пунктом 3 статьи 438 ГК РФ
            акцепт оферты равносилен заключению Договора на условиях, изложенных в оферте). 1.3.
            Моментом полного и безоговорочного принятия Заказчиком предложения Исполнителя заключить
            Договор оферты (акцептом оферты) считается факт подтверждения готовности совершить
            оплату услуги Исполнителя, посредством нажатия кнопки «Оплатить» на сайте
            https://www._________.ru/. Текст настоящего Договора-оферты (далее по тексту –
            «Договор») расположен по адресу: https://www._________.ru/_________. 1.4. Осуществляя
            акцепт Договора в порядке, определенном п. 1.3 Договора, Заказчик подтверждает, что он
            ознакомлен, согласен, полностью и безоговорочно принимает все условия Договора в том
            виде, в каком они изложены в тексте Договора, в том числе в приложениях к Договору,
            являющихся его неотъемлемой частью. 1.5. Клиент согласен, что акцепт Договора в порядке,
            указанном в п. 1.2 Договора является заключением Договора на условиях, изложенных в нем.
            1.6. Договор не может быть отозван. 1.7. Договор не требует скрепления печатями и/или
            подписания Заказчиком и Исполнителем (далее по тексту - Стороны) и сохраняет при этом
            юридическую силу. 2. Предмет договора 2.1. Предметом настоящего Договора является
            возмездное оказание Исполнителем образовательных услуг в соответствии с условиями
            настоящего Договора. 2.2. Заказчик полностью принимает условия Договора и оплачивает
            услуги Исполнителя в соответствии с условиями настоящего Договора.
          </Text>
        </div>
      </ReservationsTop>
      <ReservationsFooter
        onClickNextBtn={() => setStage('FORM')}
        onClickBackBtn={() => setStage('INFO')}
        backBtnText={'Назад'}
        nextBtnText={'Я принимаю условия'}
      />
    </>
  )
}
