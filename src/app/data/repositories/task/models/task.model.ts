import { Tag } from "../../../../domain/entities/tag.type";
import { StatusTask } from "../../../../domain/entities/task.entity";
import { UserModel } from "../../user/model/user.model";

export interface TransactionTask {
  data: DataTask;
}
export interface TransactionCreateTask {
  data: {
    createTask: TaskModel;
  };
}

export interface DataTask {
  tasks: TaskModel[];
}


export interface TaskModel {
  id?:            string;
  name:          string;
  createdAt?:     Date;
  pointEstimate: string;
  status:        StatusTask;
  dueDate:       Date;
  tags:          Tag[];
  position:      number;
  assignee:      UserModel;
}

