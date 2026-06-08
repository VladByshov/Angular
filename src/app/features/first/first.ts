import { Component, inject } from '@angular/core';
import { FirstService } from './first.service';
import { AuthService } from '../../core/auth.service';

interface DashboardPage {
  id: number;
  title: string;
  subtitle: string;
  lines: string[];
}

@Component({
  selector: 'app-first',
  imports: [],
  templateUrl: './first.html',
  styleUrl: './first.scss',
})
export class First {
  private readonly firstService = inject(FirstService);
  private readonly authService = inject(AuthService);

  readonly pages: DashboardPage[] = [
    {
      id: 1,
      title: 'Daily Highlights',
      subtitle: 'Fresh random picks for your morning mood.',
      lines: [
        'Neon street jazz concert appears in your recommendations.',
        'A new mural workshop opens near your district this weekend.',
        'Late-night poetry and ambient set received a 4.9 rating.'
      ]
    },
    {
      id: 2,
      title: 'Creative Routes',
      subtitle: 'Suggested trails to discover local artists.',
      lines: [
        'Start from old-town square and follow indie gallery markers.',
        'Take the riverside route for open-air photo installations.',
        'Finish at the rooftop cinema with acoustic mini sessions.'
      ]
    },
    {
      id: 3,
      title: 'Weekend Picks',
      subtitle: 'Balanced mix of calm spots and live events.',
      lines: [
        'Saturday brunch with vinyl DJ and handmade craft market.',
        'Sunset sketch session at botanical garden terraces.',
        'Sunday urban dance jam at central cultural platform.'
      ]
    },
    {
      id: 4,
      title: 'Community Pulse',
      subtitle: 'What users save and revisit most this week.',
      lines: [
        'Independent film courtyard climbs to #1 in saves.',
        'Ceramic studio night class sold out in 3 hours.',
        'Street piano point has the highest repeat visits.'
      ]
    },
    {
      id: 5,
      title: 'Explorer Notes',
      subtitle: 'Short practical tips for your next city walk.',
      lines: [
        'Carry light layers: evening breeze can drop temperature quickly.',
        'Book workshop slots early, especially after 18:00.',
        'Use public transport lane A2 for fastest center transfer.'
      ]
    },
    {
      id: 6,
      title: 'Night Sessions',
      subtitle: 'Curated after-dark content with softer vibes.',
      lines: [
        'Lo-fi rooftop set starts at 21:30 with panoramic view.',
        'Midnight photo walk begins from metro north entrance.',
        'Late coffee house hosts spoken-word open mic till 01:00.'
      ]
    }
  ];

  selectedPageId = this.pages[0].id;

  get selectedPage(): DashboardPage {
    return this.pages.find((page) => page.id === this.selectedPageId) ?? this.pages[0];
  }

  selectPage(pageId: number): void {
    this.selectedPageId = pageId;
  }

  getAll(): void {
    this.firstService.getAll().subscribe(console.log);
  }

  logout(): void {
    this.authService.logout();
  }
}
