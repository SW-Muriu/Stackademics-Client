import { Component, OnDestroy, ViewChild } from '@angular/core';
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
import { Subject } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { StudentsComponent } from '../../features/students/students.component';
import { SummaryCardComponent } from '../../shared/components/summary-card/summary-card.component';
import { MatSuffix } from '@angular/material/form-field';

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

  constructor(
    private notificationManService: NotificationService,
    private router: Router,
    private authManService: AuthService
  ) {}

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
