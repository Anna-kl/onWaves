/**
 * Переписка клиента с мастером. Тред один на пару «клиент × профиль мастера»:
 * услуги, акции и расчёты — только контекст сообщений, а не отдельные чаты.
 * Контракт: OcpioServer/docs/CHATS-MASTER-THREADS-2026-09-16.md.
 */

export interface IMasterChatGuest {
  name: string;
  /** 79XXXXXXXXX */
  phone: string;
  consentAccepted: boolean;
  notifyConsent: boolean;
}

export interface IStartMasterThreadRequest {
  masterProfileId: string;
  text: string;
  /** Повтор с тем же requestId не создаёт второе сообщение. */
  requestId: string;
  /** Расчёт прикладывается карточкой; токен прохода — в заголовке X-Quote-Token. */
  calculatorQuoteId?: string | null;
  /** Откуда пришёл клиент: calculator | profile | offer | record. */
  source: string;
  /** Только для гостя. Авторизованный клиент определяется по JWT. */
  guest?: IMasterChatGuest | null;
}

/** Сессия выдаётся только новому номеру: у существующего аккаунта её не отдаём без кода. */
export interface IMasterChatSession {
  token: string;
  profileUserId: string;
}

export interface IMasterThreadStarted {
  threadId: string;
  messageId: string;
  /** false — номер уже зарегистрирован: ответ мастера придёт уведомлением, чат откроется после входа. */
  canOpenChat: boolean;
  session?: IMasterChatSession | null;
}
