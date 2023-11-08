import BookingService from '../store/services/bookingService'
import FavService from '../store/services/favService'
import MeetingsService from '../store/services/meetingsService'
import SelectionsService from '../store/services/selectionsService'
import User from '../store/services/User'
import LotsValue from './services/lotsDefaultValue'
import {
  IFavorites,
  ILot,
  IMeetings,
  IReservations,
  ISelections,
} from '../store/types/lkStore.interface'
import { makeAutoObservable, runInAction } from 'mobx'
import { axiosStone } from 'shared/services/axiosConfig'

class LkStore {
  favorites: IFavorites[] | [] = []
  selections: ISelections[] | [] = []
  meetings: IMeetings[] | [] = []
  booking: IReservations[] | [] = []

  selectionsNew: number[] = []
  meetingsNew: number[] = []
  lots
  user
  favService
  selectionService
  meetingsService
  bookingService

  constructor() {
    makeAutoObservable(this)

    this.user = new User()
    this.lots = new LotsValue()
    this.favService = new FavService()
    this.selectionService = new SelectionsService()
    this.meetingsService = new MeetingsService()
    this.bookingService = new BookingService()
  }

  async fetchFavorites() {
    try {
      await this.favService.getFavorites().then((resp) =>
        runInAction(() => {
          this.favorites = resp
        })
      )
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)
      else throw new Error(String(error))
    }
  }

  async clearFavorites(ids: number[]) {
    this.favorites = []
    try {
      await axiosStone.delete('/favorites/', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.User).tokenKey}`,
        },
        data: {
          lot_ids: ids,
        },
      })
    } catch (e) {}
  }

  async clearFavorite(id: number) {
    this.favorites = this.favorites.filter((item) => item.lot.id !== id)
    await axiosStone.delete('/favorites/', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.User).tokenKey}`,
      },
      data: {
        lot_ids: [id],
      },
    })
  }

  async addFavorite(id: number) {
    this.selections = this.selections.filter((item) => item.lot.id !== id)
    await axiosStone.post('/favorites/', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.User).tokenKey}`,
      },
      data: {
        lot_ids: [id],
      },
    })
  }

  async fetchSelections() {
    try {
      await this.selectionService.getSelections().then((resp) =>
        runInAction(() => {
          this.selections = resp.selections
          this.selectionsNew = resp.newIds
        })
      )
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)
      else throw new Error(String(error))
    }
  }

  async fetchMeetings() {
    try {
      await this.meetingsService.getMeetings().then((resp) =>
        runInAction(() => {
          this.meetings = resp.meetings
          this.meetingsNew = resp.newIds
        })
      )
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)
      else throw new Error(String(error))
    }
  }

  async fetchBooking() {
    try {
      this.booking = await this.bookingService.getBooking()
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)
      else throw new Error(String(error))
    }
  }
}

export const lkStore = new LkStore()
