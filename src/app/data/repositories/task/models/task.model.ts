export interface TransactionTask {
  data: DataTask;
}

export interface DataTask {
  tasks: TaskModel[];
}


export interface TaskModel {
  id?:            string;
  name:          string;
  createdAt?:     Date;
  pointEstimate: string;
  status:        string;
  dueDate:       Date;
  tags:          string[];
  position:      number;
  assignee:      AssigneeModel;
}

export interface AssigneeModel {
  avatar:   string;
  id:       string;
  fullName: string;
}
