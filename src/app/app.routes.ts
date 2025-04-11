import { Routes } from '@angular/router';
import { SignInComponent } from './core/auth/signin/sign-in.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { ManageStudentComponent } from './features/students/manage-student/manage-student.component';
import { DataGenerationComponent } from './features/data-generation/data-generation.component';
import { DataProcessingComponent } from './features/data-processing/data-processing.component';

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
      },
      {
        path: 'manage/student',
        component: ManageStudentComponent,
        title: `${title} | Student`,
      },
      {
        path: 'data/process',
        component: DataProcessingComponent,
        title: `${title} | Data Processing`,
      },
      {
        path: 'data/generate',
        component: DataGenerationComponent,
        title: `${title} | Data Generation`,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
