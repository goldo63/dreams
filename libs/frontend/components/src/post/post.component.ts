import { Component } from '@angular/core';
import { IPost } from '@dreams/shared/models';
import { PostService } from './post.service';
import { Observable, of, startWith, tap } from 'rxjs';

@Component({
  selector: 'dreams-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  posts$!: Observable<IPost[] | null>;

  constructor(
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getAllpublic()
  }
}
