import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SignInRequest } from '../interfaces/sign-in';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly accountUrl = `${environment.apiUrl}/Account`;

  public isRefreshing$ = new BehaviorSubject<boolean>(false);
  public refreshTokenSubject$ = new BehaviorSubject<string | null>(null);

  signIn(credentials: SignInRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.accountUrl}/Login`, credentials).pipe(
      tap((response) => {
        this.tokenService.setTokens(response.accessToken, response.refreshToken);
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.tokenService.getRefreshToken();

    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(`${this.accountUrl}/Refresh`, { refreshToken }).pipe(
      tap((response) => {
        this.tokenService.setAccess(response.accessToken);
      }),
      catchError((error) => {
        if (error.status === 401) {
          this.logout();
        }
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.tokenService.clearTokens();
    this.isRefreshing$.next(false);
    this.refreshTokenSubject$.next(null);
    this.router.navigate(['/sign-in']);
  }
}
