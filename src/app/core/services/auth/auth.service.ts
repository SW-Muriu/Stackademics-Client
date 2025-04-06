import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs';
import { StorageService } from '../../../shared/services/storage-service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey: string = 'jwt_token';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          if (response.status === 200 && response.entity?.token) {
            this.storageService.setItem(this.tokenKey, response.entity.token);
          }
        })
      );
  }

  getToken(): string | null {
    return this.storageService.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.storageService.removeItem(this.tokenKey);
  }
}
