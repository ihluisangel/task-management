import { Component, Input } from '@angular/core';
import { ColumnEntity } from '../../../domain/entities/column.entity';
import { TaskEntity } from '../../../domain/entities/task.entity';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss',
})
export class TaskColumnComponent {
  @Input() column!: ColumnEntity;
  @Input() dragStart!: (
    event: DragEvent,
    task: TaskEntity,
    status: string) => void;
  @Input() dragOver!: (event: DragEvent) => void;
  @Input() dragDrop!: (event: DragEvent, status: string) => void;
}
