import { StatusTask, TaskEntity } from "./task.entity";


export interface ColumnEntity {
  listName: string;
  status: StatusTask;
  list: TaskEntity[];
}