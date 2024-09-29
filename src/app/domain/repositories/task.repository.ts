import { Observable } from "rxjs";
import { TaskEntity } from "../entities/task.entity";

export abstract class TaskRepository {
  abstract getTasks(): Observable<TaskEntity[]>;
}
