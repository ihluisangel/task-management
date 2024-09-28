import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChatBubbleLeft,
  heroEllipsisHorizontal,
  heroPaperClip,
  heroPencil,
  heroSquare3Stack3d,
  heroTrash
} from '@ng-icons/heroicons/outline';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ NgIconComponent,CommonModule,LabelComponent],
  providers: [provideIcons({
    heroPaperClip,
    heroChatBubbleLeft,
    heroSquare3Stack3d,
    heroEllipsisHorizontal,
    heroPencil,
    heroTrash
  })],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

}
