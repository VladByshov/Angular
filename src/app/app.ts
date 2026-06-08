import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { CustomToastContainer } from './shared/custom-toast-container/custom-toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CustomToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
