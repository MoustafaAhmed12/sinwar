import { Routes } from '@angular/router';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesPageComponent },
];
