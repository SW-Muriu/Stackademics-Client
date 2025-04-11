import { Component, effect, OnDestroy, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../shared/services/notification/notification.service';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../core/auth/auth/auth.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { StudentsComponent } from '../../features/students/students.component';
import { SummaryCardComponent } from '../../shared/components/summary-card/summary-card.component';
import { MatSuffix } from '@angular/material/form-field';
import { StudentService } from '../../core/services/student/student.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLinkActive,
    MatMenuModule,
    RouterLink,
    MatTooltip,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    MatDivider,
    StudentsComponent,
    SummaryCardComponent,
    MatSuffix,
    RouterOutlet,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  destroy$: Subject<boolean> = new Subject<boolean>();
  summaryData$ = new ReplaySubject<{ name: string; value: number }[]>(1);

  constructor(
    private notificationManService: NotificationService,
    private router: Router,
    private authManService: AuthService,
    private studentService: StudentService
  ) {
    this.summaryData$.next([
      { name: 'Data Processes Runs', value: 0 },
      { name: 'Student Upload Runs', value: 0 },
      { name: 'Data Generation Runs', value: 0 },
      { name: 'Students', value: 0 },
    ]);

    effect(() => {
      const totalStudents = this.studentService.getTotalStudents();
      const totalGenerationRuns = this.studentService.getTotalGenerationRuns();
      const totalProcessRuns = this.studentService.getTotalProcessRuns();
      const uploadRuns = this.studentService.getTotalStudentUploadRuns();
      console.info('Dashboard component:  Do we have the updates here yet?');
      this.updateSummaryData(
        totalStudents,
        totalProcessRuns,
        totalGenerationRuns,
        uploadRuns
      );
      console.info(
        'Updated Value: ',
        this.studentService.getTotalStudentUploadRuns()
      );
    });
  }

  updateSummaryData(
    studentsCount: number,
    processRunsCount: number,
    generationRunsCount: number,
    studentUploadRuns: number
  ) {
    this.summaryData$.subscribe(ref => {
      let student = ref.find(c => c.name === 'Students');
      let processRuns = ref.find(c => c.name === 'Data Processes Runs');
      let generationRuns = ref.find(c => c.name === 'Data Generation Runs');
      let uploadRuns = ref.find(c => c.name === 'Student Upload Runs');
      if (student && processRuns && generationRuns && uploadRuns) {
        student.value = studentsCount;
        processRuns.value = processRunsCount;
        generationRuns.value = generationRunsCount;
        uploadRuns.value = studentUploadRuns;
      }
    });
  }

  logout(isToggle = false): void {
    this.authManService.logout();
    this.router.navigate(['/']).then(() => {
      this.notificationManService.showNotificationMessage(
        'Logged out successfully',
        'snackbar-success'
      );
    });

    if (isToggle) {
      this.toggleSidenav();
    }
  }

  toggleSidenav(): void {
    this.sidenav.toggle().then(r => {});
  }

  navToDataProcessing = (func?: string): void => {
    this.router.navigate(['dashboard/data/process']).then(() => {});
    if (func) {
      this.toggleSidenav();
    }
  };

  navToDataGeneration = (func?: string): void => {
    this.router.navigate(['dashboard/data/generate']).then(() => {});
    if (func) {
      this.toggleSidenav();
    }
  };

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
