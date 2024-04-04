import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IAccount, IPost, IUser } from '@dreams/shared/models';
import { Observable, switchMap } from 'rxjs';
import { UserService } from '../../user/user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'dreams-detail-post',
  templateUrl: './detailPost.component.html',
  styleUrls: ['./detailPost.component.css'],
})
export class DetailPostComponent {
  post$: Observable<IPost> | null = null;
  user$: Observable<IAccount> | null = null;
  userDetails: IUser | undefined;

  constructor(
    private postService: PostService, 
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
        this.postService.getById(params.get('id') as string),
      )
    )

    this.user$ = this.post$.pipe(
      switchMap((post: IPost) => this.userService.getById(post.posterId))
    );
    this.user$.subscribe(account => {
      if (account) {
        this.userDetails = account.accountDetails as IUser;
      }
    });
  }
}
