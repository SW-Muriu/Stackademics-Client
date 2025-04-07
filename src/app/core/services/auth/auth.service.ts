import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../../shared/services/storage-service/storage.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CurrentUser } from '../../../shared/models/interfaces';
import { Observable } from 'rxjs';

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
  ) {}

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
    console.info('Access Token: ');
    this.router.navigate(['/auth']).then(r => {});
  }

  // API calls
  signIn(data: any): Observable<any> {
    const url = `${this.AUTH_URL}/login`;
    console.info('SET UP: ', url);
    return this.http.post(url, data);
  }
}
