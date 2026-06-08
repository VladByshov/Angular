import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignInService } from './sign-in.service';
import { SignIn } from '../../../core/interfaces/sign-in';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignInComponent {
  private readonly signInService = inject(SignInService);
  private readonly router = inject(Router);

  isLoading = false;
  errorMessage = '';

  signInForm = new FormGroup({
    login: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  submit(): void {
    if (this.signInForm.invalid || this.isLoading) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const credentials = this.signInForm.getRawValue() as SignIn;

    this.signInService.signIn(credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/first']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message ?? 'Login failed. Check credentials and try again.';
      }
    });
  }
}
