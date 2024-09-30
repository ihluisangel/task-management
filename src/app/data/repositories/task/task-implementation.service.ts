import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { TaskEntity } from '../../../domain/entities/task.entity';
import { TaskRepository } from '../../../domain/repositories/task.repository';
import {
  TaskImplementationRepositoryMapper
} from './mappers/task-repository.mapper';
import { TaskModel, TransactionTask } from './models/task.model';

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
        tasks(input: {}) {
          id
          name
          createdAt
          pointEstimate
          status
          dueDate
          tags
          position
          assignee {
            avatar
            id
            fullName
          }
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

  override createTask(params: {
    name: string;
    pointEstimate: string;
    dueDate: Date;
    tags: string[];
    assigneeId: string;
  }): Observable<TaskEntity> {

    const CREATE_TASK = gql`
    mutation CreateTask($input: CreateTaskInput!) {
      createTask(input: $input) {
        id
        name
        createdAt
        pointEstimate
        status
        dueDate
        tags
        position
        assignee {
          avatar
          id
          fullName
        }
      }
    }
  `;
    return this.apollo
      .mutate<{ createTask: TaskEntity }>({
        mutation: CREATE_TASK,
        variables: {
          input: {
            name: params.name,
            pointEstimate: params.pointEstimate,
            dueDate: params.dueDate,
            tags: params.tags,
            assigneeId: params.assigneeId,
            status: 'BACKLOG',
          },
        },
      })
      .pipe(
        map((result) => {
          const t = result.data ;
          const createdTask  = t?.createTask as TaskModel | null;
          if (!createdTask) {
            throw new Error('Error creating task');
          }
          return this.taskMapper.mapFrom(createdTask);
        })
      );
  }

  override updateTask(params: {
    id: string;
    name: string;
    pointEstimate: string;
    dueDate: Date;
    status: string;
    tags: string[];
    assigneeId: string;
  }): Observable<TaskEntity> {

    const UPDATE_TASK = gql`
    mutation UpdateTask($input: UpdateTaskInput!) {
      updateTask(input: $input) {
        id
        name
        createdAt
        pointEstimate
        status
        dueDate
        tags
        position
        assignee {
          avatar
          id
          fullName
        }
      }
    }
  `;
    return this.apollo
      .mutate<{ updateTask: TaskEntity }>({
        mutation: UPDATE_TASK,
        variables: {
          input: {
            id: params.id,
            name: params.name,
            pointEstimate: params.pointEstimate,
            dueDate: params.dueDate,
            tags: params.tags,
            assigneeId: params.assigneeId,
            status: params.status,
          },
        },
      })
      .pipe(
        map((result) => {
          const t = result.data ;
          const createdTask  = t?.updateTask as TaskModel | null;
          if (!createdTask) {
            throw new Error('Error update task');
          }
          return this.taskMapper.mapFrom(createdTask);
        })
      );
  }
  override deleteTask(params: {
    id: string;
  }): Observable<void> {

    const DELETE_TASK = gql`
    mutation deleteTask($input: DeleteTaskInput!) {
      deleteTask(input: $input) {
        id
        name
        createdAt
        pointEstimate
        status
        dueDate
        tags
        position
        assignee {
          avatar
          id
          fullName
        }
      }
    }
  `;
    return this.apollo
      .mutate<{deleteTask: void}>({
        mutation: DELETE_TASK,
        variables: {
          input: {
            id: params.id,
          },
        },
      })
      .pipe(
        map((result) => {
          const t = result.data ;
          const createdTask  = t?.deleteTask;
          if (!createdTask) {
            throw new Error('Error delete task');
          }
        })
      );
  }
}
