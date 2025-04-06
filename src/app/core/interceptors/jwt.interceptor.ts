import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../shared/services/storage-service/storage.service';
import { Observable } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const storageService: StorageService = inject(StorageService);
  const access_token: string = storageService.getItem('access_token');
  const isLogInRequest: boolean = req.url.includes('/signIn');

  const modifiedReq: HttpRequest<any> = req.clone({
    setHeaders: {
      'content-Type': 'application/json',
      ...(isLogInRequest ? {} : { Authorization: `Bearer ${access_token}` }),
    },
  });
  return next(modifiedReq);
};
