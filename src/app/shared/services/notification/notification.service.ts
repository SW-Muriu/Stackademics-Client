import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBarRef!: MatSnackBarRef<any>;

  constructor(public snackbar: MatSnackBar) {}

  showNotificationMessage(
    message: string,
    type: 'snackbar-danger' | 'snackbar-success' | 'login-snackbar',
    duration: number = 5000
  ): void {
    this.snackbar.open(message, 'X', {
      duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [type],
    });
  }
}
