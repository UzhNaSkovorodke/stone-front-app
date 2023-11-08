import axios, { AxiosInstance } from 'axios'

const axiosStone: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STONE_API_URL}/api`,
})

export { axiosStone }
