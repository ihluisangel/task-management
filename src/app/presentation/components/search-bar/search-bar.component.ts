import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBell, heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ NgIconComponent,CommonModule],
  providers: [provideIcons({ heroMagnifyingGlass, heroBell })],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

}

