import { Routes } from '@angular/router';
import { SignInComponent } from './layout/signin/sign-in.component';

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
    children: [],
  },
];
