import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface TeamDto {
  id: number;
  name: string;
  leagueId: number;
  position: number;
  score: number;
  wins: number;
  losses: number;
  draws: number;
  games: number;
}

interface RawPagedResult<T> {
  items?: T[];
  Items?: T[];
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAll(): Observable<TeamDto[]> {
    return this.http.get<unknown>(`${this.apiUrl}/Team/All`).pipe(
      map((response) => {
        const raw = response as RawPagedResult<unknown> | unknown[];
        const items = Array.isArray(raw)
          ? raw
          : (raw.items ?? raw.Items ?? []);

        return items.map((item) => this.mapTeam(item));
      })
    );
  }

  private mapTeam(item: unknown): TeamDto {
    const team = item as Record<string, unknown>;

    return {
      id: Number(team['id'] ?? team['Id'] ?? 0),
      name: String(team['name'] ?? team['Name'] ?? ''),
      leagueId: Number(team['leagueId'] ?? team['LeagueId'] ?? 0),
      position: Number(team['position'] ?? team['Position'] ?? 0),
      score: Number(team['score'] ?? team['Score'] ?? 0),
      wins: Number(team['wins'] ?? team['Wins'] ?? 0),
      losses: Number(team['losses'] ?? team['Losses'] ?? 0),
      draws: Number(team['draws'] ?? team['Draws'] ?? 0),
      games: Number(team['games'] ?? team['Games'] ?? 0)
    };
  }
}
