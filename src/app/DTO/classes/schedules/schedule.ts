export interface Schedule {
  id: string;
  daysOfWork: Date;
  addDate: string;
  scheduleId: string;
  canAdd?: boolean;
  countNew?: number;
}
