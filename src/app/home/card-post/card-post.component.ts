import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-post',
  standalone: true,
  imports: [],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css',
})
export class CardPostComponent {
  @Input() post: any;
}
