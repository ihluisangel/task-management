import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../core/base/use-case';
import { TaskEntity } from '../../entities/task.entity';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable({
  providedIn: 'root'
})
export class GetTasksUseCase implements UseCase<void, TaskEntity[]> {

  constructor(private taskRepository: TaskRepository) { }

  execute(): Observable<TaskEntity[]> {
      return this.taskRepository.getTasks();
  }
}
