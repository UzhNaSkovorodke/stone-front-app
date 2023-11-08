import { IDefaultMetro } from '../services/pageData/default/default.interface'

export const useMetro = () => {
  const getMetroStationName = (metro: IDefaultMetro[]): string => {
    const metroStationNames: Array<string> = metro.map((m: IDefaultMetro) => m.station)
    return metroStationNames.join(', ')
  }

  const getMetroTimeFrom = (metro: IDefaultMetro[]): string => {
    const metroTimeFrom: Array<string> = metro.map((m: IDefaultMetro) => `${m.time_from} мин`)
    return metroTimeFrom.join(', ')
  }

  const getMetroColor = (metro: IDefaultMetro[]): string | string[] => {
    return metro.map((m: IDefaultMetro) => m.color || '')
  }

  return {
    getMetroStationName,
    getMetroTimeFrom,
    getMetroColor,
  }
}
