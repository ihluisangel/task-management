import { Pipe, PipeTransform } from '@angular/core';
import {
  PointEstimate,
  poinEstimateData
} from '../../domain/entities/point-estimate.type';


@Pipe({
  name: 'pointEstimate',
  standalone: true,
})
export class PointEstimatePipe implements PipeTransform {
  transform(value: string): string {
    const aux = value as PointEstimate;

    return poinEstimateData[aux];

  }
}
