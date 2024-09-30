import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../core/base/use-case';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteTaskUseCase
  implements
    UseCase<
      {
        id: string;
      },
      void>
{
  constructor(private taskRepository: TaskRepository) {}

  execute(params: { id: string }): Observable<void> {
    return this.taskRepository.deleteTask(params);
  }
}
