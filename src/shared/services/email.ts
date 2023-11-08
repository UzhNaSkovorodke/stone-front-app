import { request } from '../api/request'

export enum EStatusEmailSubscribe {
  SUCCESS = 'success',
  FAIL = 'fail',
}

export enum EMessageEmailResponse {
  ALREADY_SUBSCRIBED = 'Email already subscribed',
  CREATED = 'Subscribe successfully created',
  NOT_SUBSCRIBED = 'Email not subscribed',
  CONFIRMED = 'Email successfully confirmed',
  ALREADY_CONFIRMED = 'Email already confirmed',
  UNSUBSCRIBE_SUCCESS = 'Email successfully unsubscribed',
}

export interface IEmailUnsubscribeRequest {
  hash: string
  unsubscribe_reason: number[]
  message?: string
}

export interface IEmailSubscribeResponse {
  data: ISubscribeData
  errors: string
  message: string
  status: string
}

export interface ISubscribeData {
  createdAt: string | null
  email: string | null
  isOnline: string | null
  subscribeFlg: boolean
  subscribeAt: string | null
  unsubscribeReason: string | null
  updatedAt: string | null
  userId: number | null
}

export const emailSubscribe = (email: string): Promise<IEmailSubscribeResponse> => {
  return request.post<IEmailSubscribeResponse>('email/subscribe', { email })
}

export const emailConfirm = (hash: string): Promise<IEmailSubscribeResponse> => {
  return request.post<IEmailSubscribeResponse>('email/validate', { hash })
}

export const emailUnsubscribe = (
  params: IEmailUnsubscribeRequest
): Promise<IEmailSubscribeResponse> => {
  return request.post<IEmailSubscribeResponse>('email/unsubscribe', {
    ...params,
  })
}
