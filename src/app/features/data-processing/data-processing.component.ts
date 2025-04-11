import { Component, OnDestroy, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardModule,
} from '@angular/material/card';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonModule, Location } from '@angular/common';
import { ApiService } from '../../core/services/api/api.service';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-data-processing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ],
  templateUrl: './data-processing.component.html',
  styleUrl: './data-processing.component.scss',
})
export class DataProcessingComponent implements OnDestroy {
  selectedFile: File | null = null;
  processing: boolean = false;
  destroy$: Subject<boolean> = new Subject();
  isUpload$ = signal<boolean>(false);

  constructor(
    private location: Location,
    private apiService: ApiService,
    private toastManService: NotificationService,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  processFile(): void {
    if (!this.selectedFile) return;

    this.processing = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.apiService
      .upload('data/file', formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: any) => {
          // const blob = new Blob([resp], { type: 'text/csv' });
          if (resp.statusCode == 200) {
            this.processing = false;
            this.location.back();
            this.toastManService.showNotificationMessage(
              `${resp.message} | ${resp.entity}`,
              'snackbar-success'
            );
          } else {
            this.processing = false;
            this.toastManService.showNotificationMessage(
              resp.message,
              'snackbar-danger'
            );
          }
        },
        error: (err: any) => {
          this.processing = false;
          this.toastManService.showNotificationMessage(
            `Internal server error!!`,
            'snackbar-danger'
          );
        },
      });
  }

  processLatestFile(): void {
    this.processing = true;
    this.apiService
      .post(`data/process`, {})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: any) => {
          if (resp.statusCode === 200) {
            this.processing = false;
            this.location.back();
            this.toastManService.showNotificationMessage(
              `${resp.message} | ${resp.entity}`,
              'snackbar-success'
            );
          } else {
            this.processing = false;
            this.toastManService.showNotificationMessage(
              resp.message,
              'snackbar-danger'
            );
          }
        },
        error: (err: any) => {
          this.processing = false;
          this.toastManService.showNotificationMessage(
            `Internal server error!!`,
            'snackbar-danger'
          );
        },
      });
  }

  upload() {
    this.isUpload$.set(!this.isUpload$());
  }

  onQuit(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
