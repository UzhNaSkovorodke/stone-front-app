import { request } from '../api/request'

export interface ITicketRequest {
  phone: string | undefined
  name?: string
  email?: string
  message?: string
  cm_session_id?: number | null
}

export interface ITicketResponse {
  status: string
  message: string
  data: ITicket
  errors?: string
}

export interface ITicket {
  created_at: string
  email: string | null
  message: string | null
  name: string | null
  phone: string | null
  updated_at: string
}

export const createTicket = (ticketData: ITicketRequest): Promise<ITicketResponse> => {
  return request.post<ITicketResponse>('tickets', ticketData)
}
