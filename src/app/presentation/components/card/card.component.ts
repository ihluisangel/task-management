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
import { LabelComponent } from '../label/label.component';


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

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   getTag(code: Tag, label: keyof TagInfo) :any {
    return tasktag[code][label] ;
  }
}
