import { AfterViewChecked, Component, effect } from '@angular/core';
import { initDropdowns } from 'flowbite';
import { ColumnEntity } from '../../../../domain/entities/column.entity';
import { TaskEntity } from '../../../../domain/entities/task.entity';
import {
  TaskColumnComponent
} from '../../../components/task-column/task-column.component';
import { TaskStateService } from '../../../state/task/task-state.service';


@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [TaskColumnComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements AfterViewChecked {
  columns: ColumnEntity[] = [];

  draggedTask: TaskEntity | null = null;
  sourceListStatus: string | null = null;

  datos: TaskEntity[] = [];

  private initialized = false;

  constructor(
    public taskState: TaskStateService,
  ) {
    effect(() => {
      this.columns = this.taskState.columns;
      this.initialized = false;
    });
  }
  ngAfterViewChecked(){
    if (!this.initialized && this.columns.length > 0) {
      initDropdowns()
      this.initialized = true;
    }
  }

  // On drag start, store the task and the source column
  onDragStart(event: DragEvent, task: TaskEntity, status: string) {
    this.draggedTask = task;
    this.sourceListStatus = status;
  }

  // Allow drop
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Move the task from one column to another
  onDrop(event: DragEvent, targetListName: string) {
    event.preventDefault();

    if (this.draggedTask && this.sourceListStatus) {
      const sourceColumn = this.columns.find(
        (col) => col.status === this.sourceListStatus
      );
      const targetColumn = this.columns.find(
        (col) => col.status === targetListName
      );

      if (sourceColumn && targetColumn) {
        // Remove the task from the source column
        const taskIndex = sourceColumn.list.indexOf(this.draggedTask);
        if (taskIndex > -1) {
          sourceColumn.list.splice(taskIndex, 1);
        }

        // Add the task to the target column
        targetColumn.list.push(this.draggedTask);

        // after add task, update in backedn
        this.taskState.updateTask({
          id: this.draggedTask.id!,
          name: this.draggedTask.name,
          assigneeId: this.draggedTask.assignee.id,
          status: targetListName,
          tags: this.draggedTask.tags,
          pointEstimate: this.draggedTask.pointEstimate,
          dueDate: this.draggedTask.dueDate
        })
      }
    }

    // Clear the temporary state
    this.draggedTask = null;
    this.sourceListStatus = null;
  }
}
