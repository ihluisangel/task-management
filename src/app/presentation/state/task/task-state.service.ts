import { Injectable, signal } from '@angular/core';
import { ColumnEntity } from '../../../domain/entities/column.entity';
import { TaskEntity } from '../../../domain/entities/task.entity';
import {
  CreateTaskUseCase
} from '../../../domain/use-cases/task/create-task.usecase';
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

  constructor(
    private _getTaskUseCase: GetTasksUseCase,
    private _createTaskUseCase: CreateTaskUseCase
  ) {}

  get columns(): ColumnEntity[] {
    return this._columns();
  }

  loadTasks(): void {
    this._getTaskUseCase.execute().subscribe({
      next: (data: TaskEntity[]) => {
        this.setTaskToColumns(data);
      },
      error: (error) => {
        console.error('Error', error);
      },
    });
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
  private addTask(task: TaskEntity) {
    const auxCols: ColumnEntity[] = [...this._columns()].map((e) => {
      const n = { ...e };
      return n;
    });
    for (const c of auxCols) {
      if(c.status == task.status){
        c.list.push(task)
        break;
      }
    }
    this._columns.set(auxCols);
  }

  // Create
  createTask(params: {
    name: string;
    pointEstimate: string;
    dueDate: Date;
    tags: string[];
    assigneeId: string;
  }) {
    this._createTaskUseCase.execute(params).subscribe({
      next: (data: TaskEntity) => {
        this.addTask(data)
      },
      error: (error) => {
        console.error('Error', error);
      },
    });
  }
}
