import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccount } from '@dreams/shared/models';
import { UserService } from '../user.service';

@Component({
  selector: 'dreams-account-detail',
  templateUrl: './detailUser.component.html',
  styleUrls: ['./detailUser.component.css']
})
export class DetailUserComponent implements OnInit {
  account: IAccount | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(account => {
      this.account = account;
    });
  }

  editAccount(): void {
    this.router.navigate(['/account/edit']);
  }
}