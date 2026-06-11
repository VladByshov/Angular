import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInService } from './sign-in.service';
import { SignInRequest } from '../../../core/interfaces/sign-in';
import { AuthLayout } from '../../../layout/auth-layout/auth-layout';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, AuthLayout],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  private readonly signInService = inject(SignInService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

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
    const credentials = this.signInForm.getRawValue() as SignInRequest;

    this.signInService.signIn(credentials).subscribe({
      next: () => {
        this.isLoading = false;
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/first';
        this.router.navigateByUrl(returnUrl);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message ?? 'Login failed. Check credentials and try again.';
      }
    });
  }
}
