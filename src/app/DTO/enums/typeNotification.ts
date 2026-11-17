export enum TypeNotification {
  NEW_RECORD,
  CANCEL_RECORD,
  NEW_MESSAGE,
  CONFIRM_RECORD,
  /** Мастер перенёс запись. В конце, чтобы не сдвинуть уже сохранённые коды. */
  RESCHEDULE_RECORD,
  REVIEW_AVAILABLE,
  REVIEW_REWARDED,
  REVIEW_ATTENDANCE_REQUESTED
}
