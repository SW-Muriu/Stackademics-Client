import { Routes } from '@angular/router';
import { SignInComponent } from './core/auth/signin/sign-in.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { ManageStudentComponent } from './features/students/manage-student/manage-student.component';
import { DataGenerationComponent } from './features/data-generation/data-generation.component';
import { DataProcessingComponent } from './features/data-processing/data-processing.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { DataViewerComponent } from './shared/components/data-viewer/data-viewer.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';

const title: string = 'Stackademics';
export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    pathMatch: 'full',
    title: `${title}`,
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: `${title} | Dashboard`,
        children: [
          {
            path: '',
            component: LandingPageComponent,
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
          {
            path: 'data/generate',
            component: DataGenerationComponent,
            title: `${title} | Data Generation`,
          },
          {
            path: 'data-viewer',
            component: DataViewerComponent,
            title: `${title} | Data View`,
          },
        ],
      },
    ],
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
