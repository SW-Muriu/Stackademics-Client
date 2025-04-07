import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../core/services/auth/auth.service';
import { NotificationService } from '../../shared/services/notification/notification.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  hide$: WritableSignal<boolean> = signal(true);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly authManService: AuthService,
    private notificationManService: NotificationService
  ) {
    this.signInForm = this.createAuthForm();
  }

  createAuthForm = (): FormGroup => {
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  };

  clickEvent(event: MouseEvent) {
    this.hide$.set(!this.hide$());
    event.stopPropagation();
  }

  signIn(): void {
    console.info('Sign in: ', this.signInForm.value);
    this.authManService
      .signIn(this.signInForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          if (res.statusCode == 200) {
            this.authManService.login(res.entity.token);
            localStorage.setItem('token', res.entity.token);
            this.router.navigate(['/dashboard']).then(() => {});
            this.notificationManService.showNotificationMessage(
              res.responseMessage,
              'snackbar-success'
            );
          } else {
            this.notificationManService.showNotificationMessage(
              'Invalid Credentials',
              'snackbar-danger'
            );
          }
        },
        error: (err: any) => {
          console.info('err', err);
          this.notificationManService.showNotificationMessage(
            'Internal Server Error',
            'snackbar-danger'
          );
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {}
}
