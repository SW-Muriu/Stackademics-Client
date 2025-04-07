import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  post<T>(url: string, data: T): Observable<T> {
    return this.http
      .post<T>(`${environment.apiUrl}/${url}`, data)
      .pipe(catchError(this.handleError));
  }

  //File upload
  upload(url: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post(`${environment.apiUrl}/${url}`, formData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Something went wrong';
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else {
      message = `Error ${error.status}: ${error.error?.message || error.message}`;
    }
    return throwError(() => new Error(message));
  }
}
