export enum EModalVariant {
  REQUEST_ACCEPTED = 'request-accepted',
  EMAIL_CONFIRMED = 'email-confirmed',
  SUBSCRIBE_NEWS = 'subscribe-news',
  SUBSCRIBE_NEWS_SUCCESS = 'subscribe-news-success',
  UNSUBSCRIBED_EMAIL = 'unsubscribed-email',
  NOT_SUBSCRIBED = 'not-subscribed',
}

export enum EFormType {
  RESERVATION = 'RESERVATION',
  WAITING_LIST = 'WAITING_LIST',
  CALLBACK = 'CALLBACK',
  PROPERTY = 'PROPERTY',
  SUBSCRIBE = 'SUBSCRIBE',
}

export interface IFormToEmit {
  reason: number[]
  message?: string
}
