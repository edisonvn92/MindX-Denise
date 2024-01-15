// eslint-disable-next-line no-shadow
export enum SupportStatusEnum {
  NotStarted = 'NOT_STARTED',
  Requesting = 'REQUESTING',
  Waiting = 'WAITING',
  Expired = 'EXPIRED',
  MentorFound = 'MENTOR_FOUND',
  Started = 'STARTED',
  WaitingRating = 'WAITING_RATING',
  Ended = 'ENDED',
}
// eslint-disable-next-line no-shadow
export enum SuportRequestExpireTimeEnum {
  StudentRequest = 5 * 60 * 1000,
  MentorRequest = 2 * 60 * 1000,
}
