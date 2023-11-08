import classes from 'src/styles/pages/500.module.scss'
import { Spinner } from 'src/shared/components/Spinner/Spinner'

export default function Error() {
  return (
    <div className={classes.block}>
      <div className={classes.block__icon}>
        <Spinner />
      </div>
      <div
        className={classes.block__title}
        dangerouslySetInnerHTML={{ __html: 'Внутренняя ошибка<br/>сервера' }}></div>
      <div
        className={classes.block__description}
        dangerouslySetInnerHTML={{
          __html: 'Мы знаем о проблеме и работаем<br/>над ее устранением',
        }}></div>
    </div>
  )
}
