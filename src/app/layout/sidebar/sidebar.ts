import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  id: string;
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly menuItems: MenuItem[] = [
    { id: 'players', label: '⚽ Players', route: '/dashboard/players' },
    { id: 'teams', label: '🏆 Teams', route: '/dashboard/teams' },
    { id: 'accounts', label: '👥 Accounts', route: '/dashboard/accounts' },
  ];
}
