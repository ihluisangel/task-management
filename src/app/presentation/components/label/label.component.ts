import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroBars3,
  heroClock,
  heroSquares2x2,
} from '@ng-icons/heroicons/outline';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const text :any = {
  primary: 'text-primary-300',
  secondary: 'text-secondary-300',
  tertiary: 'text-tertiary-300',
  neutral: 'text-neutral-50',
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bg : any = {
  primary: 'bg-primary-300',
  secondary: 'bg-secondary-300',
  tertiary: 'bg-tertiary-300',
  neutral: 'bg-neutral-50',
};

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  providers: [provideIcons({ heroSquares2x2, heroBars3, heroClock })],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
})
export class LabelComponent {
  @Input() type: 'primary' | 'secondary' | 'tertiary' | 'neutral'  =
    'primary';
  @Input() icon: string | null = null; // default
  @Input() name: string | null = ''; //default

  getText() {
    return text[this.type];
  }
  getBg() {
    return bg[this.type];
  }
}
