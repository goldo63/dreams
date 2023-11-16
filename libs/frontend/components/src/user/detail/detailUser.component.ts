import { Component, OnInit } from '@angular/core';
import { IAccount } from '@dreams/shared/models';
import { Observable, switchMap } from 'rxjs';
import { UserService } from '../user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AccountValidator } from '@dreams/shared/services';

@Component({
  selector: 'dreams-detail-user',
  templateUrl: './detailUser.component.html',
  styleUrls: ['./detailUser.component.css'],
})
export class DetailUserComponent implements OnInit {
  user$: Observable<IAccount> | null = null;;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
        this.userService.getById(parseInt(params.get('id') as string)),
      )
    );
  }

  get accountValidator(): typeof AccountValidator {
    return AccountValidator;
  }

}
