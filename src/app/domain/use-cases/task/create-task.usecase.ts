import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../core/base/use-case';
import { TaskEntity } from '../../entities/task.entity';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable({
  providedIn: 'root'
})
export class CreateTaskUseCase implements UseCase< {
    name: string;
    pointEstimate: string;
    dueDate: Date;
    tags: string[];
    assigneeId: string;
  }, TaskEntity> {

  constructor(private taskRepository: TaskRepository) { }

  execute(params: {
    name: string;
    pointEstimate: string;
    dueDate: Date;
    tags: string[];
    assigneeId: string;
  }): Observable<TaskEntity> {

      return this.taskRepository.createTask(params);
  }
}
