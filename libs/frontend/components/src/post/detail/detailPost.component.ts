import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IAccount, IPost, IUser } from '@dreams/shared/models';
import { Observable, Subject, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../user/user.service';
import { PostService } from '../post.service';
import { AuthService } from '@dreams/frontend/uiAuth';

@Component({
  selector: 'dreams-detail-post',
  templateUrl: './detailPost.component.html',
  styleUrls: ['./detailPost.component.css'],
})
export class DetailPostComponent {
  post$: Observable<IPost> | null = null;
  user$: Observable<IAccount> | null = null;
  userDetails: IUser | undefined;
  postId = '';

  userMayEdit = false;

  // Subject for emitting event when a reaction is submitted
  reactionSubmitted$: Subject<void> = new Subject<void>();

  constructor(
    private postService: PostService, 
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.handlePost(params))
    );

    this.user$ = this.post$.pipe(
      switchMap((post: IPost) => this.userService.getById(post.posterId))
    );
    this.user$.subscribe(account => {
      if (account) {
        this.userDetails = account.accountDetails as IUser;
      }
    });
  }

  private handlePost(params: ParamMap): Observable<IPost> {
    const postId = params.get('id') as string;
    this.postId = postId;
    return this.postService.getById(postId).pipe(
      switchMap(post => this.handleUserMayEdit(post)),
    );
  }

  private handleUserMayEdit(post: IPost): Observable<IPost> {
    return this.authService.userMayEdit(post.posterId).pipe(
      tap(canEdit => this.userMayEdit = canEdit),
      map(() => post)
    );
  }

  handlePostRefresh(): void {
    // Call the service method to refresh the post
    this.postService.getById(this.postId).subscribe(
      (post: IPost) => {
        // Assign the new post data to the post$ observable
        this.post$ = of(post);
      },
      (error) => {
        // Handle error if the post couldn't be refreshed
        console.error('Error refreshing post:', error);
      }
    );
  }
}
