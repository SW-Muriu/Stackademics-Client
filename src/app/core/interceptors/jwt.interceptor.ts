import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

let authService: AuthService;

export const jwtInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
  const token = authService.getToken();

  if (!token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
