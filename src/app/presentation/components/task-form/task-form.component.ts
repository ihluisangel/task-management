/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initDropdowns } from 'flowbite';
import { poinEstimateData } from '../../../domain/entities/point-estimate.type';
import { tasktag } from '../../../domain/entities/tag.type';
import { UserEntity } from '../../../domain/entities/user.entity';
import { TaskStateService } from '../../state/task/task-state.service';
import { UserStateService } from '../../state/user/user-state.service';
import { DatePickerComponent } from '../datepicker/datepicker.component';
import { LabelComponent } from '../label/label.component';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [LabelComponent, DatePickerComponent, DatePipe, FormsModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements AfterViewInit, OnInit {
  @Output() save = new EventEmitter<boolean>();
  @Output() finish = new EventEmitter<void>();

  @ViewChild('dropdown4') dropdown4: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('dropdown2') dropdown2: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('dropdown1') dropdown1: ElementRef<HTMLDivElement> | undefined;

  form: any = {
    name: null,
    pointEstimate: null,
    dueDate: null,
    assignee: null,
    tags: [],
  };

  openDatePicker = false;

  taglist: any = tasktag;
  keysTag = Object.keys(this.taglist);
  pointEstimateList: any = poinEstimateData;
  keysPoints = Object.keys(this.pointEstimateList);

  constructor(
    public userState: UserStateService,
    public taskState: TaskStateService
  ) {
    effect(()=>{
      if(taskState.editTask == null){
        this.form = {
          name: null,
          pointEstimate: null,
          dueDate: null,
          assignee: null,
          tags: [],
        };
      } else {
        this.form = {
          name: taskState.editTask.name,
          pointEstimate: taskState.editTask.pointEstimate,
          dueDate: taskState.editTask.dueDate,
          assignee: taskState.editTask.assignee,
          tags: taskState.editTask.tags,
        };
      }
    })
  }

  ngOnInit() {
    this.userState.loadUsers();
  }
  ngAfterViewInit() {
    initDropdowns();
  }

  onClose() {
    this.finish.emit();
  }

  isSelected(key: any) {
    const idx = this.form.tags.findIndex((e: any) => e == key);
    return idx != -1;
  }
  changeKey(key: any) {
    if (this.isSelected(key)) {
      this.form.tags = this.form.tags.filter((tag: any) => tag !== key);
    } else {
      this.form.tags.push(key);
    }
  }
  changePoint(point: any) {
    this.form.pointEstimate = point;
    this.closeDropdown1();
  }
  changeUser(user: UserEntity) {
    this.form.assignee = user;
    this.closeDropdown2();
  }
  changeDate(date: Date) {
    this.form.dueDate = date;
    this.closeDropdown4();
  }
  closeDropdown4() {
    if (this.dropdown4) {
      this.dropdown4.nativeElement.classList.add('hidden');
    }
  }
  closeDropdown1() {
    if (this.dropdown1) {
      this.dropdown1.nativeElement.classList.add('hidden');
    }
  }
  closeDropdown2() {
    if (this.dropdown2) {
      this.dropdown2.nativeElement.classList.add('hidden');
    }
  }

  submit(){
    if(this.taskState.editTask === null){
      const params: {
        name: string;
        pointEstimate: string;
        dueDate: Date;
        tags: string[];
        assigneeId: string;
      } = {
        name: this.form.name,
        pointEstimate: this.form.pointEstimate as string,
        dueDate: this.form.dueDate,
        tags: this.form.tags,
        assigneeId: this.form.assignee.id
      }
      this.taskState.createTask(params)
    } else {
      const params: {
        id: string;
        name: string;
        pointEstimate: string;
        dueDate: Date;
        tags: string[];
        assigneeId: string;
        status: string;
      } = {
        id: this.taskState.editTask.id!,
        name: this.form.name,
        pointEstimate: this.form.pointEstimate as string,
        dueDate: this.form.dueDate,
        tags: this.form.tags,
        assigneeId: this.form.assignee.id,
        status : this.taskState.editTask.status
      }
      this.taskState.updateTask(params)
    }

    this.save.emit(true)
  }

}
