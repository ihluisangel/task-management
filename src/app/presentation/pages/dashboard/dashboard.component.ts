import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroBars3,
  heroPlus,
  heroSquares2x2
} from '@ng-icons/heroicons/outline';
import {
  SearchBarComponent
} from '../../components/search-bar/search-bar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TaskStateService } from '../../state/task/task-state.service';
import { GridComponent } from './grid/grid.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIconComponent,
    CommonModule, SidebarComponent,
    SearchBarComponent,
    GridComponent
  ],
  providers: [provideIcons({ heroSquares2x2, heroBars3, heroPlus })],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(public taskState: TaskStateService){}

  ngOnInit(){
    this.taskState.loadTasks();
  }
}
