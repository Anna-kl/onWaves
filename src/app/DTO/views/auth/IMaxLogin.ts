/**
 * Вход через MAX без предварительной привязки.
 * Совпадает с DataModel.ViewModel.AuthView.MaxLoginState на бэке — числа не менять.
 */
export enum MaxLoginState {
  Waiting = 0,
  ContactRequested = 1,
  CodeSent = 2,
  Authorized = 3,
  Expired = 4,
}

export interface IMaxLoginStart {
  sessionId: string;
  link: string;
  expiresAt: string;
}

export interface IMaxLoginStatus {
  sessionId: string;
  state: MaxLoginState;
}
