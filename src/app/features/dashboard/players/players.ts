import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService, PlayerDto } from './player.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players.html',
  styleUrl: './players.scss'
})
export class Players implements OnInit {
  private readonly playerService = inject(PlayerService);

  players: PlayerDto[] = [];
  isLoading = false;
  error: string | null = null;

  page = 1;
  pageSize = 10;
  totalCount = 0;
  sortType: number | null = null;
  sortByPlayer: number | null = null;

  readonly pageSizeOptions = [5, 10, 20, 50, 100];

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
  }

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.isLoading = true;
    this.error = null;

    this.playerService.getAll({
      page: this.page,
      pageSize: this.pageSize,
      sortType: this.sortType,
      sortByPlayer: this.sortByPlayer
    }).subscribe({
      next: (response) => {
        this.players = response.items;
        this.totalCount = response.totalCount;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load players. Check pagination/filter values and try again.';
        this.isLoading = false;
        console.error('Error loading players:', err);
      }
    });
  }

  goToPreviousPage(): void {
    if (this.page <= 1 || this.isLoading) {
      return;
    }

    this.page -= 1;
    this.loadPlayers();
  }

  goToNextPage(): void {
    if (this.page >= this.totalPages || this.isLoading) {
      return;
    }

    this.page += 1;
    this.loadPlayers();
  }

  updatePageSize(value: string): void {
    this.pageSize = Number(value);
    this.page = 1;
    this.loadPlayers();
  }

  updateSortType(value: string): void {
    this.sortType = value === '' ? null : Number(value);
  }

  updateSortByPlayer(value: string): void {
    this.sortByPlayer = value === '' ? null : Number(value);
  }

  applyFilters(): void {
    this.page = 1;
    this.loadPlayers();
  }

  resetFilters(): void {
    this.page = 1;
    this.pageSize = 10;
    this.sortType = null;
    this.sortByPlayer = null;
    this.loadPlayers();
  }
}
