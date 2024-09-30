import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChatBubbleLeft,
  heroEllipsisHorizontal,
  heroPaperClip,
  heroPencil,
  heroSquare3Stack3d,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { Tag, TagInfo, tasktag } from '../../../domain/entities/tag.type';
import { TaskEntity } from '../../../domain/entities/task.entity';
import { DueDatePipe } from '../../pipes/due-date.pipe';
import { PointEstimatePipe } from '../../pipes/point-estimate.pipe';
import { TaskStateService } from '../../state/task/task-state.service';
import { LabelComponent } from '../label/label.component';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIconComponent,
    CommonModule,
    LabelComponent,
    PointEstimatePipe,
    DueDatePipe,
  ],
  providers: [
    provideIcons({
      heroPaperClip,
      heroChatBubbleLeft,
      heroSquare3Stack3d,
      heroEllipsisHorizontal,
      heroPencil,
      heroTrash,
    }),
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() task!: TaskEntity;

  constructor(
    public taskState: TaskStateService,
    private modalService: ModalService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTag(code: Tag, label: keyof TagInfo): any {
    return tasktag[code][label];
  }

  deleteTask(task: TaskEntity) {
    this.taskState.deleteTask({ id: task.id!, status: task.status });
  }
  openUpdate(task: TaskEntity) {
    this.taskState.editTask = task;
    this.openModal('crud-modal');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
}
