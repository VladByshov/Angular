import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirstService {
  private readonly http = inject(HttpClient);
  private readonly rootUrl = environment.apiUrl + '/Account';

  getAll(): Observable<unknown> {
    return this.http.get<unknown>(`${this.rootUrl}/All`);
  }
}
