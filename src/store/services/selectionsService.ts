import { axiosStone } from 'shared/services/axiosConfig'
import { camelize } from 'shared/utils/camelize'

export default class SelectionsService {
  constructor() {}

  getSelections = async () => {
    const response = await axiosStone
      .get(`/selections/`, {
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
