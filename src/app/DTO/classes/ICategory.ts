export interface ICategory {
  id: number;
  name: string;
  parentId?: number;
  comment?: string;
  fields?: string;
  isChoose?: boolean;
  icon?: string;
}
