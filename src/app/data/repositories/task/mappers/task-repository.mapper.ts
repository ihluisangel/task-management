import { Mapper } from '../../../../core/base/mapper';
import { TaskEntity } from '../../../../domain/entities/task.entity';
import { TaskModel } from '../models/task.model';

export class TaskImplementationRepositoryMapper extends Mapper<
  TaskModel,
  TaskEntity
> {
  mapFrom(param: TaskModel): TaskEntity {
    return {
      id: param.id,
      name: param.name,
      createdAt: param.createdAt,
      pointEstimate: param.pointEstimate,
      status: param.status,
      dueDate: param.dueDate,
      tags: param.tags,
      position: param.position,
      assignee: param.assignee,
    };
  }
  mapTo(param: TaskEntity): TaskModel {
    return {
      id: param.id,
      name: param.name,
      createdAt: param.createdAt,
      pointEstimate: param.pointEstimate,
      status: param.status,
      dueDate: param.dueDate,
      tags: param.tags,
      position: param.position,
      assignee: param.assignee,
    };
  }
}
