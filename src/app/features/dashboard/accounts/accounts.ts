import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService, AccountDto } from './account.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss'
})
export class Accounts implements OnInit {
  private readonly accountService = inject(AccountService);

  accounts: AccountDto[] = [];
  isLoading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadAccounts();
  }

  private loadAccounts(): void {
    this.isLoading = true;
    this.error = null;

    this.accountService.getAll().subscribe({
      next: (data) => {
        this.accounts = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load accounts. Please try again.';
        this.isLoading = false;
        console.error('Error loading accounts:', err);
      }
    });
  }

  formatDate(date: string): string {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return date;
    }
  }
}

