export const usePhoneMask = () => {
  const getPhoneNumberMask = (
    inputEvent: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): string => {
    const checkFirstPhoneNumberSymbols = (value: string): string => {
      if (value.length < 2 && value[0] != '+' && value[0] != '7' && value[0] != '8') {
        return (value = '7' + value)
      }
      return value
    }

    const checkNumberLength = (value: string): string => {
      return value.slice(0, 11)
    }

    const formatPhone = (value: string): string => {
      let phone = `+7 (${value.slice(1, 4)}`

      {
        value.length > 4 && (phone += `)`)
      }
      {
        value.length > 4 && (phone += ` ${value.slice(4, 7)}`)
      }
      {
        value.length > 7 && (phone += ` ${value.slice(7, 9)}`)
      }
      {
        value.length > 9 && (phone += ` ${value.slice(9, 11)}`)
      }

      return phone
    }

    return formatPhone(
      checkNumberLength(checkFirstPhoneNumberSymbols(inputEvent.target.value.replace(/\D/g, '')))
    )
  }

  const getTrimPhoneNumber = (
    inputEvent: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): string => {
    const checkFirstPhoneNumberSymbols = (value: string): string => {
      if (value.length < 2 && value[0] != '+' && value[0] != '7' && value[0] != '8') {
        return (value = '7' + value)
      }
      return value
    }

    const checkNumberLength = (value: string): string => {
      return value.slice(0, 11)
    }
    return checkFirstPhoneNumberSymbols(
      checkNumberLength(inputEvent.target.value.replace(/\D/g, ''))
    )
  }

  return {
    maskedPhone: getPhoneNumberMask,
    trimedPhone: getTrimPhoneNumber,
  }
}
