import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskEntity } from '../../../../domain/entities/task.entity';
import {
  GetTasksUseCase
} from '../../../../domain/use-cases/task/get-tasks.usecase';
import {
  Column,
  Task,
  TaskColumnComponent,
} from '../../../components/task-column/task-column.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [TaskColumnComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements OnInit {
  columns: Column[] = [
    {
      listName: 'Planned',
      list: [
        {
          title: 'Task 1',
          description: 'Task 1 Description',
          assignee: 'John',
          date: '2024-09-01',
        },
        {
          title: 'Task 2',
          description: 'Task 2 Description',
          assignee: 'Jane',
          date: '2024-09-02',
        },
        {
          title: 'Task 3',
          description: 'Task 2 Description',
          assignee: 'Jane',
          date: '2024-09-02',
        },
        {
          title: 'Task 5',
          description: 'Task 2 Description',
          assignee: 'Jane',
          date: '2024-09-02',
        },
      ],
    },
    {
      listName: 'Selected ',
      list: [],
    },
    {
      listName: 'In progress',
      list: [],
    },
    {
      listName: 'Ready',
      list: [],
    },
    {
      listName: 'Finish',
      list: [],
    },
  ];

  draggedTask: Task | null = null;
  sourceListName: string | null = null;

  response$: Observable<TaskEntity[]> | undefined;
  datos: TaskEntity [] = [];

  constructor(private _getTaskUseCase : GetTasksUseCase){

  }
  ngOnInit(){
    this.response$ = this._getTaskUseCase.execute();
    this.response$.subscribe(
      (data: TaskEntity []) => {
        console.log(data);
        this.datos = data;
      }
    );
  }

  // On drag start, store the task and the source column
  onDragStart(event: DragEvent, task: Task, listName: string) {
    this.draggedTask = task;
    this.sourceListName = listName;
  }

  // Allow drop
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Move the task from one column to another
  onDrop(event: DragEvent, targetListName: string) {
    event.preventDefault();

    if (this.draggedTask && this.sourceListName) {
      const sourceColumn = this.columns.find(
        (col) => col.listName === this.sourceListName
      );
      const targetColumn = this.columns.find(
        (col) => col.listName === targetListName
      );

      if (sourceColumn && targetColumn) {
        // Remove the task from the source column
        const taskIndex = sourceColumn.list.indexOf(this.draggedTask);
        if (taskIndex > -1) {
          sourceColumn.list.splice(taskIndex, 1);
        }

        // Add the task to the target column
        targetColumn.list.push(this.draggedTask);
      }
    }

    // Clear the temporary state
    this.draggedTask = null;
    this.sourceListName = null;
  }
}
