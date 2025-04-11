import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentService } from '../../../core/services/student/student.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-manage-student',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './manage-student.component.html',
  styleUrl: './manage-student.component.scss',
})
export class ManageStudentComponent implements OnInit {
  studentForm!: FormGroup;
  pageFunction: string = 'Add';
  formData: any;
  classes = [
    { name: 'Class 1' },
    { name: 'Class 2' },
    { name: 'Class 3' },
    { name: 'Class 4' },
    { name: 'Class 5' },
  ];
  isMax$ = signal<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private toastManService: NotificationService
  ) {
    this.studentForm = this.initStudentForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (queriedParams: Params) => {
        if (Object.prototype.hasOwnProperty.call(queriedParams, 'rowData')) {
          this.pageFunction = queriedParams['action'];
          this.formData = JSON.parse(queriedParams['rowData']);
          if (this.pageFunction === 'Update') {
            this.studentForm.patchValue(this.formData);
          }
        }
      },
      error: err => {
        console.error(err);
      },
    });

    this.studentForm.valueChanges.subscribe({
      next: (c: any) => {
        console.info('C value: ', c);
        this.isMax$.update(() => c.score > 100);
      },
    });
  }

  initStudentForm(): FormGroup {
    return this.formBuilder.group({
      studentId: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      className: ['', Validators.required],
      score: ['', Validators.required],
    });
  }

  onSubmit(): void {
    switch (this.pageFunction) {
      case 'Add':
        this.postStudents();
        break;
      case 'Update':
        this.putStudent();
        break;
    }
  }

  onQuit(): void {
    this.location.back();
  }

  private postStudents = (): void => {
    this.studentService.postStudent(this.studentForm.getRawValue()).subscribe({
      next: (resp: any) => {
        if (resp.statusCode === 200) {
          this.toastManService.showNotificationMessage(
            resp.message,
            'snackbar-success'
          );
          this.router.navigate(['/dashboard']).then(r => {});
        } else {
          this.toastManService.showNotificationMessage(
            resp.message,
            'snackbar-danger'
          );
        }
      },
      error: () => {
        this.toastManService.showNotificationMessage(
          'Internal Server Error',
          'snackbar-danger'
        );
      },
    });
  };

  private putStudent = (): void => {
    this.studentService
      .updateStudent(this.studentForm.getRawValue())
      .subscribe({
        next: (resp: any) => {
          if (resp.statusCode === 200) {
            this.toastManService.showNotificationMessage(
              resp.message,
              'snackbar-success'
            );
            this.router.navigate(['/dashboard']).then(r => {});
          } else {
            this.toastManService.showNotificationMessage(
              resp.message,
              'snackbar-danger'
            );
          }
        },
        error: err => {
          this.toastManService.showNotificationMessage(
            'Internal Server Error',
            'snackbar-danger'
          );
        },
      });
  };
}
