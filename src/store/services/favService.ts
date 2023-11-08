import { axiosStone } from 'shared/services/axiosConfig'
import { camelize } from 'shared/utils/camelize'

export default class FavService {
  constructor() {}

  getFavorites = async () => {
    const response = await axiosStone
      .get(`/favorites/`, {
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
