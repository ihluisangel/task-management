import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroBars3,
  heroPlus,
  heroSquares2x2,
} from '@ng-icons/heroicons/outline';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../components/modal/modal.service';
import {
  SearchBarComponent
} from '../../components/search-bar/search-bar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import {
  TaskFormComponent
} from '../../components/task-form/task-form.component';
import { TaskStateService } from '../../state/task/task-state.service';
import { GridComponent } from './grid/grid.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIconComponent,
    CommonModule,
    SidebarComponent,
    SearchBarComponent,
    GridComponent,
    ModalComponent,
    TaskFormComponent
  ],
  providers: [provideIcons({ heroSquares2x2, heroBars3, heroPlus })],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(
    public taskState: TaskStateService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.taskState.loadTasks();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  beforeCloseModal(value : boolean){
    if(value){
      this.closeModal('crud-modal')

    }
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
