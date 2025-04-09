import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule],
})
export class HeaderComponent {
  current: 'upload' | 'review' = 'upload';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      if (url.includes('review')) {
        this.current = 'review';
      } else {
        this.current = 'upload';
      }
    });
  }
}
