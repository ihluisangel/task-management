import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {

  constructor(private toastr: ToastrService) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): void {
    // Puedes procesar diferentes tipos de errores aquí
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      this.toastr.error(error.graphQLErrors[0].message, 'Error');
    } else if (error.networkError) {
      this.toastr.error('Network error', 'Error');
    } else {
      this.toastr.error('An unknown error has occurred', 'Error');
    }
  }
}