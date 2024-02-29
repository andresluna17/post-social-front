import { Component, OnInit } from '@angular/core';
import { CardProfileComponent } from './card-profile/card-profile.component';
import { CardFormComponent } from './card-form/card-form.component';
import { CardPostComponent } from './card-post/card-post.component';
import { PostService } from '../shared/post.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardProfileComponent,
    CardFormComponent,
    CardPostComponent,
    InfiniteScrollModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private postService: PostService) {}

  items: any[] = [];
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 7;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  toggleLoading = () => (this.isLoading = !this.isLoading);

  // it will be called when this component gets initialized.
  loadData = () => {
    this.currentPage = 1;
    this.toggleLoading();
    this.postService.getPost(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => (this.items = [...response.items]),
      error: (err) => console.log(err),
      complete: () => this.toggleLoading(),
    });
  };

  // this method will be called on scrolling the page
  appendData = () => {
    this.toggleLoading();
    this.postService.getPost(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => (this.items = [...this.items, ...response.items]),
      error: (err) => console.log(err),
      complete: () => this.toggleLoading(),
    });
  };

  onScroll = () => {
    this.currentPage++;
    this.appendData();
  };

  ngOnInit(): void {
    this.loadData();
  }
}
