import { Routes } from '@angular/router';
import { SignInComponent } from './core/auth/signin/sign-in.component';
import {DashboardComponent} from "./layout/dashboard/dashboard.component";

const title: string = 'Stackademics';
export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    pathMatch: 'full',
    title: `${title}`,
  },
  {
    path: '#',
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: `${title} | Dashboard`,
      }
    ],
  },
];
