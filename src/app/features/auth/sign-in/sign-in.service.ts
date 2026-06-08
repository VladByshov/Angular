import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/auth.service';
import { SignIn } from '../../../core/interfaces/sign-in';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private readonly authService = inject(AuthService);

  signIn(credentials: SignIn): Observable<{ accessToken: string; refreshToken: string }> {
    return this.authService.signIn(credentials);
  }
}
