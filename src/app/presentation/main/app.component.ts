import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ToastNoAnimation, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
  ],
  providers: [
    { provide: ToastrService, useClass: ToastrService },
    { provide: ToastNoAnimation, useClass: ToastNoAnimation }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {

  ngOnInit() {
    initFlowbite();
  }
}
