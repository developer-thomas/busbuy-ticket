import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingComponent } from './pages/booking/booking.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}
}
