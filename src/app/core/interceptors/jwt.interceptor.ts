import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../shared/services/storage-service/storage.service';
import { Observable } from 'rxjs';

function contentType(
  requestType: boolean
): 'multipart/form-data' | 'application/json' {
  return requestType ? 'multipart/form-data' : 'application/json';
}

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const storageService: StorageService = inject(StorageService);
  const access_token: string = storageService.getItem('access_token');
  const isLogInRequest: boolean = req.url.includes('/v1/auth/login');
  const isFileRequest: boolean = req.url.includes('/file');

  const modifiedReq: HttpRequest<any> = req.clone({
    setHeaders: {
      // 'content-Type': contentType(isFileRequest),
      ...(isLogInRequest ? {} : { Authorization: `Bearer ${access_token}` }),
    },
  });

  console.info('Modified Request', modifiedReq);
  return next(modifiedReq);
};
