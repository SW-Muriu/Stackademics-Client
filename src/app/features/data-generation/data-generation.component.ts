import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { Location } from '@angular/common';
import { ApiService } from '../../core/services/api/api.service';
import { NotificationService } from '../../shared/services/notification/notification.service';

@Component({
  selector: 'app-data-generation',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
  ],
  templateUrl: './data-generation.component.html',
  styleUrl: './data-generation.component.scss',
})
export class DataGenerationComponent {
  dataForm: FormGroup = this.fb.group({
    numberOfRecords: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private apiService: ApiService,
    private toastManService: NotificationService
  ) {}

  onQuit(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.apiService
      .post(`data/generate`, this.dataForm.value)
      .pipe()
      .subscribe({
        next: (resp: any) => {
          if (resp.statusCode === 200) {
            this.toastManService.showNotificationMessage(
              `${resp.message} and saved in file path: ${resp.entity}`,
              'snackbar-success',
              10000
            );
          } else {
            this.toastManService.showNotificationMessage(
              resp.message,
              'snackbar-danger'
            );
          }
        },
        error: (err: any) => {
          this.toastManService.showNotificationMessage(
            'Internal Server Error',
            'snackbar-success'
          );
        },
      });
  }
}
