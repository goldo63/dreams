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
  users$: IAccount[] = [];

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    
    this.posts$ = this.postService.getAllpublic()
    
    this.userService.getAll().subscribe(user => {
      this.users$ = user;
    })
  }

  getUserName(posterId: number): string {
    const user = this.users$.find(u => u.id === posterId);
    if(user !== undefined && 
      AccountValidator.isUser(user.accountDetails)){
      return user.username
    }
    return 'Unknown Account'
  }

  onDeletePost(postId: number): void {
    this.posts$ = this.postService.delete(postId);
  }
}
