import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDate',
  standalone: true,
})
export class DueDatePipe implements PipeTransform {
  transform(value: Date | string | number): string {
    const inputDate = new Date(value);
    const today = new Date();

    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(todayDate.getDate() - 1);

    const inputDateNoTime = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate()
    );

    if (inputDateNoTime.getTime() === todayDate.getTime()) {
      return 'Today';
    } else if (inputDateNoTime.getTime() === yesterdayDate.getTime()) {
      return 'Yesterday';
    } else {
      return formatDate(inputDate, 'd MMMM, yyyy', 'en-US');
    }
  }
}
