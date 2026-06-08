import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FirstService} from './first.service';

@Component({
  selector: 'app-first',
  imports: [],
  templateUrl: './first.html',
  styleUrl: './first.css',
})
export class First implements OnInit, OnDestroy {
  private readonly firstService = inject(FirstService);
  private countdownId: ReturnType<typeof setInterval> | null = null;

  remainingSeconds = 5;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.clearCountdown();
  }

  getAll() {
    this.firstService.getAll().subscribe(console.log);
  }

  private startCountdown(): void {
    this.clearCountdown();
    this.remainingSeconds = 5;

    this.countdownId = setInterval(() => {
      if (this.remainingSeconds <= 0) {
        this.clearCountdown();
        return;
      }

      this.remainingSeconds -= 1;
    }, 1000);
  }

  private clearCountdown(): void {
    if (this.countdownId) {
      clearInterval(this.countdownId);
      this.countdownId = null;
    }
  }
}
