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
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

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
    private router: Router
  ) {
    this.signInForm = this.createAuthForm();
  }

  createAuthForm = (): FormGroup => {
    return this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  };

  clickEvent(event: MouseEvent) {
    this.hide$.set(!this.hide$());
    event.stopPropagation();
  }

  signIn(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {}
}
