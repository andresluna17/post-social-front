import { Component } from '@angular/core';
import { CardProfileComponent } from './card-profile/card-profile.component';
import { CardFormComponent } from './card-form/card-form.component';
import { CardPostComponent } from './card-post/card-post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardProfileComponent, CardFormComponent, CardPostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
