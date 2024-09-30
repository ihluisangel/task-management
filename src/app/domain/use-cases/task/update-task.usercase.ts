import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../core/base/use-case';
import { TaskEntity } from '../../entities/task.entity';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable({
  providedIn: 'root'
})
export class UpdateTaskUseCase implements UseCase< {
    id: string;
    name: string;
    pointEstimate: string;
    dueDate: Date;
    tags: string[];
    assigneeId: string;
    status: string;
  }, TaskEntity> {

  constructor(private taskRepository: TaskRepository) { }

  execute(params: {
    id: string;
    name: string;
    pointEstimate: string;
    dueDate: Date;
    tags: string[];
    assigneeId: string;
    status: string;
  }): Observable<TaskEntity> {

      return this.taskRepository.updateTask(params);
  }
}
