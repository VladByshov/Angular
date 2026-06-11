import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface AccountDto {
  id: number;
  age: number;
  city: number;
  company: string | null;
  createdAt: string;
  login: string;
}

interface RawPagedResult<T> {
  items?: T[];
  Items?: T[];
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAll(): Observable<AccountDto[]> {
    return this.http.get<unknown>(`${this.apiUrl}/Account/All`).pipe(
      map((response) => {
        const raw = response as RawPagedResult<unknown> | unknown[];
        const items = Array.isArray(raw)
          ? raw
          : (raw.items ?? raw.Items ?? []);

        return items.map((item) => this.mapAccount(item));
      })
    );
  }

  private mapAccount(item: unknown): AccountDto {
    const account = item as Record<string, unknown>;

    return {
      id: Number(account['id'] ?? account['Id'] ?? 0),
      age: Number(account['age'] ?? account['Age'] ?? 0),
      city: Number(account['city'] ?? account['City'] ?? 0),
      company: (account['company'] ?? account['Company'] ?? null) as string | null,
      createdAt: String(account['createdAt'] ?? account['CreatedAt'] ?? ''),
      login: String(account['login'] ?? account['Login'] ?? '')
    };
  }
}
