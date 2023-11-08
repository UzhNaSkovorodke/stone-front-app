//Изменение окончания взависимости от total
export const fixNumerical = (total: number | undefined) => {
  if (total) {
    let balance = total % 100
    if (balance >= 5 && balance <= 20) {
      return `Смотреть ${total} вариантов`
    }
    balance = total % 10
    if (balance === 1) {
      return `Смотреть ${total} вариант`
    }
    if (balance >= 2 && balance <= 4) {
      return `Смотреть ${total} варианта`
    }
    return `Смотреть ${total} вариантов`
  }
}
