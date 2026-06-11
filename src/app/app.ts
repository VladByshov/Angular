import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { CustomToastContainer } from './layout/custom-toast-container/custom-toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CustomToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
