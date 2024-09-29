import { Injectable, signal } from '@angular/core';
import { ColumnEntity } from '../../../domain/entities/column.entity';
import { TaskEntity } from '../../../domain/entities/task.entity';
import {
  GetTasksUseCase
} from '../../../domain/use-cases/task/get-tasks.usecase';

@Injectable({
  providedIn: 'root',
})
export class TaskStateService {
  private _columns = signal<ColumnEntity[]>([
    {
      status: 'BACKLOG',
      listName: 'Backlog',
      list: [],
    },
    {
      status: 'CANCELLED',
      listName: 'Backlog',
      list: [],
    },
    {
      status: 'TODO',
      listName: 'To do',
      list: [],
    },
    {
      status: 'IN_PROGRESS',
      listName: 'In progress',
      list: [],
    },
    {
      status: 'DONE',
      listName: 'Complete',
      list: [],
    },
  ]);

  constructor(private _getTaskUseCase: GetTasksUseCase) {}

  get columns(): ColumnEntity[] {
    return this._columns();
  }

  loadTasks(): void {
    this._getTaskUseCase.execute().subscribe(
      (data: TaskEntity[]) => {
        this.setTaskToColumns(data);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
  private setTaskToColumns(task: TaskEntity[]) {
    const auxCols: ColumnEntity[] = [...this._columns()].map((e) => {
      const n = { ...e };
      n.list = [];
      return n;
    });
    task.forEach((t: TaskEntity) => {
      const find = auxCols.findIndex((e) => e.status == t.status);
      if (find != -1) {
        auxCols[find].list.push(t);
      }
    });
    this._columns.set(auxCols);
  }
}
