import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { Subject } from 'rxjs';
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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  destroy$: Subject<boolean> = new Subject<boolean>();
  summaryData: any;

  constructor(
    private notificationManService: NotificationService,
    private router: Router,
    private authManService: AuthService,
    private studentService: StudentService
  ) {
    this.studentService.fetchTotalRecords();
    this.summaryData = [
      { name: 'Data Processes Runs', value: 32455 },
      { name: 'Students', value: this.studentService.totalRecords() },
      { name: 'Data Generation Runs', value: 34 },
    ];
  }

  logout(): void {
    this.authManService.logout();
    this.router.navigate(['/']).then(() => {
      this.notificationManService.showNotificationMessage(
        'Logged out successfully',
        'snackbar-success'
      );
    });
  }

  toggleSidenav(): void {
    this.sidenav.toggle().then(r => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
