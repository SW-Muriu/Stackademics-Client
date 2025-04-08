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
import { AuthService } from '../../core/services/auth/auth.service';
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
      { name: 'Data Processes Runs', value: 32455 },
      { name: 'Students', value: 0 },
      { name: 'Data Generation Runs', value: 34 },
    ]);

    effect(() => {
      const total = this.studentService.getTotalStudents();
      console.info('Dashboard component:  Do we have the updates here yet?');
      this.updateSummaryData(total);
      console.info('Updated Value: ', this.studentService.getTotalStudents());
    });
  }

  updateSummaryData(data: any) {
    this.summaryData$.subscribe(ref => {
      let student = ref.find(c => c.name === 'Students');
      if (student) {
        student.value = data;
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

  navToDataProcessing = (): void => {
    this.router.navigate(['#/data/process']).then(() => {});
  };

  navToDataGeneration = (): void => {
    this.router.navigate(['#/data/generate']).then(() => {});
  };

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
