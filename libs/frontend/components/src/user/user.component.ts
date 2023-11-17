import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { Observable, switchMap } from 'rxjs';
import { IAccount } from '@dreams/shared/models';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AccountValidator } from '@dreams/shared/services';

@Component({
  selector: 'dreams-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  users$: IAccount[] = [];

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.users$ = users;
    });
  }

  onDeleteUser(userId: number): void {
    this.userService.delete(userId).subscribe(users => {
      this.users$ = users;
    });
  }

  get accountValidator(): typeof AccountValidator {
    return AccountValidator;
  }

}
