import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [],
  templateUrl: './card-profile.component.html',
  styleUrl: './card-profile.component.css',
})
export class CardProfileComponent implements OnInit {
  user = { fullName: '', age: '' };
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getUserProfile().subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.doLogout();
  }
}
