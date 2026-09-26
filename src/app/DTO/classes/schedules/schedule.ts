/** Дни месяца с API; в рантайме приходит «как в JSON» (часто PascalCase), для календаря нормализуется в ScheduleService. */
export interface Schedule {
  id: string;
  daysOfWork: Date;
  addDate: string;
  scheduleId: string;
  canAdd?: boolean;
  countNew?: number;
  /** Сколько слотов вернёт ручка слотов на этот день. Приходит только когда в запрос передана услуга. */
  freeSlotsCount?: number | null;
}
