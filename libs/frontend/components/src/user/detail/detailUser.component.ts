import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs'; // Import the `of` function
import { IAccount, IReaction, IUser } from '@dreams/shared/models';
import { UserService } from '../user.service';
import { AccountValidator } from '@dreams/shared/services';
import { PostService } from '../../post/post.service';

@Component({
  selector: 'dreams-account-detail',
  templateUrl: './detailUser.component.html',
  styleUrls: ['./detailUser.component.css']
})
export class DetailUserComponent implements OnInit {
  account$!: Observable<IAccount | undefined>; // Change the type to Observable<IAccount | undefined>
  userDetails: IUser | undefined;
  reactions$!: Observable<IReaction[]>; // Change the type to Observable<IAccount[] |

  constructor(
    private userService: UserService,
    private router: Router,
    private postService: PostService) { }

  ngOnInit(): void {
    this.account$ = this.userService.getCurrentUser();
    this.account$.subscribe(account => {
      if (account) {
        this.userDetails = account.accountDetails as IUser;
      }
    });

    this.reactions$ = this.userService.getReactions();
    this.reactions$.subscribe(reactions => {
      console.log(reactions);
    });
  }

  editAccount(): void {
    this.router.navigate(['/account/edit']);
  }

  deletePost(id: string): void {
    this.postService.deleteReaction(id).subscribe(() => {
      this.reactions$ = this.userService.getReactions();
    })
  }
  
}