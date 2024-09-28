import { Routes } from '@angular/router';
import { DashboardComponent } from '../../presentation/pages/dashboard/dashboard.component';
import { NotFoundComponent } from '../../presentation/pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: NotFoundComponent }
];
