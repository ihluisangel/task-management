import { Injectable, signal } from '@angular/core';
import {
  ErrorHandlingService
} from '../../../core/error-handler/error-handling.service';
import { ColumnEntity } from '../../../domain/entities/column.entity';
import { TaskEntity } from '../../../domain/entities/task.entity';
import {
  CreateTaskUseCase
} from '../../../domain/use-cases/task/create-task.usecase';
import {
  DeleteTaskUseCase
} from '../../../domain/use-cases/task/delete-task.usecase';
import {
  GetTasksUseCase
} from '../../../domain/use-cases/task/get-tasks.usecase';
import {
  UpdateTaskUseCase
} from '../../../domain/use-cases/task/update-task.usercase';

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
      listName: 'Cancelled',
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

  taskLoading = signal<boolean>(false)
  taskLength = signal<number>(0)

  private _view = signal<'list' | 'grid'>('grid');

  private _editTask = signal<TaskEntity | null>(null)

  constructor(
    private _getTaskUseCase: GetTasksUseCase,
    private _createTaskUseCase: CreateTaskUseCase,
    private _updateTaskUseCase: UpdateTaskUseCase,
    private _deleteTaskUseCase: DeleteTaskUseCase,
    private _errorHandler: ErrorHandlingService
  ) {}

  get columns(): ColumnEntity[] {
    return this._columns();
  }
  get view(): 'list' | 'grid' {
    return this._view();
  }

  public set view(v: 'list' | 'grid') {
    this._view.set(v);
  }

  get editTask(): TaskEntity | null {
    return this._editTask();
  }

  public set editTask(v: TaskEntity | null) {
    this._editTask.set(v);
  }

  loadTasks(): void {
    this.taskLoading.set(true)
    this._getTaskUseCase.execute().subscribe({
      next: (data: TaskEntity[]) => {
        this.setTaskToColumns(data);
        this.taskLength.set(data.length)
      },
      error: (error) => {
       this._errorHandler.handleError(error)
      },
      complete: ()=> {
        this.taskLoading.set(false)
      }
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
  private refreshTask(task: TaskEntity) {
    const auxCols: ColumnEntity[] = [...this._columns()].map((e) => {
      const n = { ...e };
      return n;
    });
    for (const c of auxCols) {
      if (c.status == task.status) {
        const idx = c.list.findIndex((e) => e.id == task.id);
        if (idx == -1) {
          c.list.push(task);
        } else {
          c.list[idx] = task;
        }
        break;
      }
    }
    this._columns.set(auxCols);
  }
  private removeTask(id: string, status: string) {
    const auxCols: ColumnEntity[] = [...this._columns()].map((e) => {
      const n = { ...e };
      return n;
    });
    for (const c of auxCols) {
      if (c.status == status) {
        c.list = c.list.filter((e) => e.id != id);
        break;
      }
    }
    this._columns.set(auxCols);
  }

  createTask(params: {
    name: string;
    pointEstimate: string;
    dueDate: Date;
    tags: string[];
    assigneeId: string;
  }) {
    this._createTaskUseCase.execute(params).subscribe({
      next: (data: TaskEntity) => {
        this.refreshTask(data);
      },
      error: (error) => {
        this._errorHandler.handleError(error)
      },
    });
  }
  updateTask(params: {
    id: string;
    name: string;
    pointEstimate: string;
    dueDate: Date;
    tags: string[];
    assigneeId: string;
    status: string;
  }) {
    this._updateTaskUseCase.execute(params).subscribe({
      next: (data: TaskEntity) => {
        this.refreshTask(data);
      },
      error: (error) => {
        this._errorHandler.handleError(error)
      },
    });
  }

  deleteTask(params: { id: string; status: string }) {
    this._deleteTaskUseCase.execute({ id: params.id }).subscribe({
      next: () => {
        this.removeTask(params.id, params.status);
      },
      error: (error) => {
        this._errorHandler.handleError(error)
      },
    });
  }
}
