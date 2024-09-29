import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { TaskEntity } from '../../../domain/entities/task.entity';
import { TaskRepository } from '../../../domain/repositories/task.repository';
import {
  TaskImplementationRepositoryMapper
} from './mappers/task-repository.mapper';
import { TransactionTask } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskImplementationService extends TaskRepository {
  private taskMapper = new TaskImplementationRepositoryMapper();

  constructor(private apollo: Apollo) {
    super();
  }

  override getTasks(): Observable<TaskEntity[]> {
    const GET_TASKS = gql`
      query {
        tasks(input: { }) {
          id
          name
          createdAt
          pointEstimate
          status
          dueDate
          tags
          position
          assignee {avatar, id, fullName}
      }
    }
    `;

    return this.apollo
      .watchQuery<{ tasks: TaskEntity[] }>({
        query: GET_TASKS,
      })
      .valueChanges.pipe(
        map((result: TransactionTask) =>
          result.data.tasks.map(this.taskMapper.mapFrom)
        )
      );
  }
}
