import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IAccount, IPost, IReaction, IUser } from '@dreams/shared/models';
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

  accountDetails: IAccount | undefined;
  userDetails: IUser | undefined;
  postId = '';

  showForm = false;
  reaction: IReaction = {
    id: '0',
    isPositiveVote: true,
    Context: '',
    ReactionDate: new Date(),
    reactions: undefined
  };

  userMayEdit = false;

  // Subject for emitting event when a reaction is submitted
  reactionSubmitted$: Subject<void> = new Subject<void>();

  constructor(
    private postService: PostService, 
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
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
        this.accountDetails = account;
        this.userDetails = account.accountDetails as IUser;
      }
    });
  }

  stringifyObject(obj: any): string {
    return JSON.stringify(obj);
  }

  private handlePost(params: ParamMap): Observable<IPost> {
    this.postId = params.get('id') as string;
    return this.postService.getById(this.postId).pipe(
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

  toggleMedia() {
    const imgElement = document.querySelector('.media img') as HTMLImageElement;
    const videoElement = document.querySelector('.media video') as HTMLVideoElement;

    const imgTag = document.querySelector('.imgTag') as HTMLDivElement;
    const videoTag = document.querySelector('.videoTag') as HTMLDivElement;

    
    if (imgElement && videoElement) {
        if (imgElement.style.display !== 'none') {
            imgElement.style.display = 'none';
            videoElement.style.display = 'block';
            videoElement.play(); // Auto-play video when clicked
            imgTag.classList.remove('active');
            videoTag.classList.add('active');

        } else {
            imgElement.style.display = 'block';
            videoElement.style.display = 'none';
            videoElement.pause(); // Pause video when toggled back to image
            imgTag.classList.add('active');
            videoTag.classList.remove('active');
        }
    }
  }

  showReact() {
    this.showForm =!this.showForm;
  }

  react() {
    this.postService.react(this.postId, null, this.reaction).subscribe(
      () => {
        // Optionally, you can handle a successful response here
        console.log('Reaction submitted successfully');
        this.handlePostRefresh();
        this.showForm = false;
      },
      error => {
        // Handle error if the post couldn't be refreshed
        console.error('Error submitting reaction:', error);
      }
    );
  }

  deletePost(){
    this.postService.delete(this.postId).subscribe(
      () => {
        // Optionally, you can handle a successful response here
        console.log('Post deleted successfully');
        this.router.navigate(['/item/post']);
      },
      error => {
        // Handle error if the post couldn't be refreshed
        console.error('Error deleting post:', error);
      }
    );
  }
}
