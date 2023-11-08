import axios from 'axios'
import { camelize } from 'shared/utils/camelize'
import { LotCardData } from 'shared/types/lotCard'

export const getLotById = (lotNumber: string): Promise<LotCardData> => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_STONE_API_URL}/api/lots/${lotNumber}`)
    .then((data) => camelize(data.data.data))
    .catch(() => {
      return undefined
    })
}
