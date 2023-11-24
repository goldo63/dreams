import { Component } from '@angular/core';
import { IPost } from '@dreams/shared/models';
import { PostService } from './post.service';

@Component({
  selector: 'dreams-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  posts$: IPost[] = [];

  constructor(
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.postService.getAllpublic().subscribe(posts => {
      this.posts$ = posts;
    });
  }

}
