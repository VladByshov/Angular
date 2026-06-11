import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterLink],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss'
})
export class AuthLayout {
  @Input({ required: true }) title = '';
  @Input({ required: true }) subtitle = '';
  @Input() alternateText = '';
  @Input() alternateLinkText = '';
  @Input() alternateLink = '/sign-in';
}
