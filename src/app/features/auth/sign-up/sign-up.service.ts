import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SignUpRequest } from '../../../core/interfaces/sign-up';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private readonly http = inject(HttpClient);
  private readonly rootUrl = environment.apiUrl + '/Account';

  signUp(data: SignUpRequest): Observable<unknown> {
    return this.http.post<unknown>(`${this.rootUrl}/Register`, data);
  }
}
