import { Component, inject } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { SignUpRequest } from '../../../core/interfaces/sign-up';
import { Router } from '@angular/router';
import { AuthLayout } from '../../../layout/auth-layout/auth-layout';

function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, AuthLayout],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  private readonly signUpService = inject(SignUpService);
  private readonly router = inject(Router);

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  signUpForm = new FormGroup({
    login: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  }, { validators: passwordsMatchValidator });

  submit(): void {
    if (this.signUpForm.invalid || this.isLoading) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValue = this.signUpForm.getRawValue();
    const credentials: SignUpRequest = {
      login: formValue.login,
      password: formValue.password
    };

    this.signUpService.signUp(credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Account created successfully. Redirecting to sign in...';
        setTimeout(() => {
          this.router.navigate(['/sign-in']);
        }, 1000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message ?? 'Registration failed. Please try again.';
      }
    });
  }
}
