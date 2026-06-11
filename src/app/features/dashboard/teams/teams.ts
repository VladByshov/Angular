import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService, TeamDto } from './team.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams.html',
  styleUrl: './teams.scss'
})
export class Teams implements OnInit {
  private readonly teamService = inject(TeamService);

  teams: TeamDto[] = [];
  isLoading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadTeams();
  }

  private loadTeams(): void {
    this.isLoading = true;
    this.error = null;

    this.teamService.getAll().subscribe({
      next: (data) => {
        this.teams = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load teams. Please try again.';
        this.isLoading = false;
        console.error('Error loading teams:', err);
      }
    });
  }
}
