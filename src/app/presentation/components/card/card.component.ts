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
import { TaskEntity } from '../../../domain/entities/task.entity';
import { DueDatePipe } from '../../pipes/due-date.pipe';
import { PointEstimatePipe } from '../../pipes/point-estimate.pipe';
import { LabelComponent } from '../label/label.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tasktag: any = {
  ANDROID: {
    type: 'tertiary',
    name: 'ANDROID',
  },
  IOS: {
    type: 'secundary',
    name: 'IOS APP',
  },
  NODE_JS: {
    type: 'tertiary',
    name: 'NODE JS',
  },
  RAILS: {
    type: 'primary',
    name: 'RAILS',
  },
  REACT: {
    type: 'secondary',
    name: 'REACT',
  },
};

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

  getTag(code: string, label: string) {
    return tasktag[code][label];
  }
}
