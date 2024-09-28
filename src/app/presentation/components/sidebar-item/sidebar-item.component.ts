import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars3, heroSquares2x2 } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [ NgIconComponent,CommonModule],
  providers: [provideIcons({ heroSquares2x2, heroBars3 })],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {

  @Input() selected = false;
  @Input() icon = 'heroSquares2x2'; // default
  @Input() name = ''; // default

  @Output() press = new EventEmitter<void>();


  onPress() {
    this.press.emit();
  }
}
