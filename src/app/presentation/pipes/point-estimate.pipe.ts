import { Pipe, PipeTransform } from '@angular/core';
type PointEstimate = 'EIGHT' | 'FOUR' | 'ONE' | 'TWO' | 'ZERO';

@Pipe({
  name: 'pointEstimate',
  standalone: true,
})
export class PointEstimatePipe implements PipeTransform {
  transform(value: string): string {
    const aux = value as PointEstimate;
    let newValue = '';

    switch (aux) {
      case 'ONE':
        newValue = '1 Point';
        break;
      case 'TWO':
        newValue = '2 Points';
        break;
      case 'FOUR':
        newValue = '4 Points';
        break;
      case 'EIGHT':
        newValue = '8 Points';
        break;
      default:
        newValue = '';
        break;
    }
    return newValue;
  }
}
