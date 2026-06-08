import {Component, inject} from '@angular/core';
import {FirstService} from './first.service';
import {SignUpService} from '../auth/sign-up/sign-up.service';

@Component({
  selector: 'app-first',
  imports: [],
  templateUrl: './first.html',
  styleUrl: './first.css',
})
export class First {
  private readonly firstService = inject(FirstService);
  getAll() {
    this.firstService.getAll().subscribe(console.log);
  }
}
