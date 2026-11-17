export interface IOptionsRecord {
  name: string;
  /** null — мастер создал запись без телефона. Гостевая запись по-прежнему шлёт номер. */
  phone: string | null;
  IsRemandDay: boolean;
  IsRemandHours: boolean;
}
