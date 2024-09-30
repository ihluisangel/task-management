import { Observable } from 'rxjs';
import { TaskEntity } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract getTasks(): Observable<TaskEntity[]>;
  abstract createTask(params: {
    name: string;
    pointEstimate: string;
    dueDate: Date;
    tags: string[];
    assigneeId: string;
  }): Observable<TaskEntity>;
}
