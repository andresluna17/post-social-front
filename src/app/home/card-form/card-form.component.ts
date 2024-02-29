import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../shared/post.service';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css',
})
export class CardFormComponent {
  @Input() update!: Function;
  postForm: FormGroup;

  constructor(public fb: FormBuilder, private postService: PostService) {
    this.postForm = this.fb.group({
      title: [''],
      content: [''],
    });
  }

  createPost() {
    this.postService
      .createPost(this.postForm.value.title, this.postForm.value.content)
      .subscribe((res) => {
        alert('Post success created');
        this.update();
      });
  }
}
