import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface PlayerDto {
  id: number;
  name: string;
  surname: string;
  number: number;
  teamId: number;
}

export interface PlayerQuery {
  page: number;
  pageSize: number;
  sortType?: number | null;
  sortByPlayer?: number | null;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

interface RawPagedResult<T> {
  items?: T[];
  totalCount?: number;
  Items?: T[];
  TotalCount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAll(query: PlayerQuery): Observable<PagedResult<PlayerDto>> {
    let params = new HttpParams()
      .set('Page', query.page)
      .set('PageSize', query.pageSize);

    if (query.sortType !== null && query.sortType !== undefined) {
      params = params.set('SortType', query.sortType);
    }

    if (query.sortByPlayer !== null && query.sortByPlayer !== undefined) {
      params = params.set('SortByPlayer', query.sortByPlayer);
    }

    return this.http
      .get<RawPagedResult<unknown>>(`${this.apiUrl}/Player/All`, { params })
      .pipe(
        map((response) => ({
          items: (response.items ?? response.Items ?? []).map((item) => this.mapPlayer(item)),
          totalCount: response.totalCount ?? response.TotalCount ?? 0
        }))
      );
  }

  private mapPlayer(item: unknown): PlayerDto {
    const player = item as Record<string, unknown>;

    return {
      id: Number(player['id'] ?? player['Id'] ?? 0),
      name: String(player['name'] ?? player['Name'] ?? ''),
      surname: String(player['surname'] ?? player['Surname'] ?? ''),
      number: Number(player['number'] ?? player['Number'] ?? 0),
      teamId: Number(player['teamId'] ?? player['TeamId'] ?? 0)
    };
  }
}
