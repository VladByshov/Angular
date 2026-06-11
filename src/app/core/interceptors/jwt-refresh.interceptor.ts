import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const jwtRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes('/Account/Refresh') &&
        !req.url.includes('/Account/Login') &&
        !req.url.includes('/Account/Register')
      ) {
        if (!authService.isRefreshing$.value) {
          authService.isRefreshing$.next(true);
          authService.refreshTokenSubject$.next(null);

          return authService.refreshToken().pipe(
            switchMap((tokens) => {
              authService.isRefreshing$.next(false);
              authService.refreshTokenSubject$.next(tokens.accessToken);

              return next(req.clone({
                setHeaders: { Authorization: `Bearer ${tokens.accessToken}` }
              }));
            }),
            catchError((refreshError) => {
              authService.isRefreshing$.next(false);
              return throwError(() => refreshError);
            })
          );
        } else {
          return authService.refreshTokenSubject$.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((newToken) => {
              return next(req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              }));
            })
          );
        }
      }

      return throwError(() => error);
    })
  );
};
