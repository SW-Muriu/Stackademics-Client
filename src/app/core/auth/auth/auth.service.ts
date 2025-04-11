import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../../shared/services/storage-service/storage.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CurrentUser } from '../../../shared/models/interfaces';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_URL: string = `${environment.apiUrl}/auth`;
  private token: string | null = null;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {
    this.startTokenCheck();
  }

  //JWT Token Session Management
  login(token: string): void {
    this.token = token;
    this.storageService.setItem('access_token', token);
  }

  setCurrentUser(currentUser: CurrentUser): void {
    this.storageService.setItem('currentUser', JSON.stringify(currentUser));
  }

  logout(): void {
    this.token = null;
    this.storageService.removeItem('access_token');
    this.router.navigate(['/auth']).then(r => {});
  }

  getToken(): string | null {
    return this.token || this.storageService.getItem('access_token');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decoded: any = jwtDecode(token);
    const currentTime: number = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime; // Check if expired
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  // API calls
  signIn(data: any): Observable<any> {
    const url = `${this.AUTH_URL}/login`;
    console.info('SET UP: ', url);
    return this.http.post(url, data);
  }

  private startTokenCheck() {
    this.debounce(
      () => {
        const expired = this.isTokenExpired();
        if (expired) {
          this.logout();
        }
      },
      10 * 60 * 1000
    )();
  }

  private debounce(func: Function, wait: number) {
    let timeout: any;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(), wait);
    };
  }
}
