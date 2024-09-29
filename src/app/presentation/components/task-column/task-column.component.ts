import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
export interface Task {
  title: string;
  description: string;
  assignee: string;
  date: string;
}
export interface Column {
  listName: string;
  list: Task[];
}

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss',
})
export class TaskColumnComponent {
  @Input() column!: Column;
  @Input() dragStart!: (event: DragEvent, task: Task, listName: string) => void;
  @Input() dragOver!: (event: DragEvent) => void;
  @Input() dragDrop!: (event: DragEvent, listName: string) => void;
}
