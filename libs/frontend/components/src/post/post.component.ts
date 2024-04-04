import { Component } from '@angular/core';
import { IAccount, IPost } from '@dreams/shared/models';
import { PostService } from './post.service';
import { UserService } from '../user/user.service';
import { AccountValidator } from '@dreams/shared/services';
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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getAllpublic()
  }
}
