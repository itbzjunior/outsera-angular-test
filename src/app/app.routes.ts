import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MovieListComponent } from './features/movie-list/movie-list.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'movies',
    component: MovieListComponent,
    title: 'Movie List',
  }
];
