import { axiosStone } from 'shared/services/axiosConfig'
import { camelize } from 'shared/utils/camelize'

export default class BookingService {
  constructor() {}

  getBooking = async () => {
    const response = await axiosStone
      .get(`/reservations/`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.User).tokenKey}`,
        },
      })
      .then((resp) => {
        return resp.data
      })
    return camelize(response.data)
  }
}
