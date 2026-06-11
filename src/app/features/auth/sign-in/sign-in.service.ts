import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { SignInRequest } from '../../../core/interfaces/sign-in';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private readonly authService = inject(AuthService);

  signIn(credentials: SignInRequest): Observable<{ accessToken: string; refreshToken: string }> {
    return this.authService.signIn(credentials);
  }
}
