import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);

  get isLoggedIn(): boolean {
    return !!this.tokenService.getAccessToken();
  }

  logout(): void {
    this.authService.logout();
  }
}
