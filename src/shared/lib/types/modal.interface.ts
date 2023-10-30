export enum EModalVariant {
  REQUEST_ACCEPTED = 'request-accepted',
  EMAIL_CONFIRMED = 'email-confirmed',
  SUBSCRIBE_NEWS = 'subscribe-news',
  SUBSCRIBE_NEWS_SUCCESS = 'subscribe-news-success',
  UNSUBSCRIBED_EMAIL = 'unsubscribed-email',
  NOT_SUBSCRIBED = 'not-subscribed',
}
export interface IFormToEmit {
  reason: number[]
  message?: string
}
