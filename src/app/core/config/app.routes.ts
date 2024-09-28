import { Routes } from '@angular/router';
import { NotFoundComponent } from '../../presentation/pages/not-found/not-found.component';

export const routes: Routes = [
  {path: '**', component: NotFoundComponent}
];
