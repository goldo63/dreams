import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IAccount } from '@dreams/shared/models';
import { of, switchMap, tap } from 'rxjs';
import { UserService } from '../user.service';
import { AccountValidator } from '@dreams/shared/services';

@Component({
  selector: 'dreams-edit-user',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.css'],
})
export class EditUserComponent implements OnInit{
  user: IAccount = {
    id: 0,
    phoneNumber: '',
    dateOfRegistration: new Date(),
    password: '',
    accountDetails: {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
    }
  }
  updatingUser = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if(params.get('id')){
          this.updatingUser = false;
          return this.userService.getById(parseInt(params.get('id') as string));
        } else{
          this.updatingUser = true;
          return of(this.user);
        }
      }),
    ).subscribe((user : IAccount) => {
      this.user = user;
    })
  }

  onSubmit(): void {
    if(this.updatingUser){
      this.userService.update(this.user).subscribe((result) => {
        console.log("Result: " + JSON. stringify(result));
        this.router.navigate(['item/user']);
      } );
    } else{
      this.userService.create(this.user).subscribe((result) => {
        console.log("Result: " + JSON. stringify(result));
        this.router.navigate(['item/user']);
      } );
    }
    
  }

  get accountValidator(): typeof AccountValidator {
    return AccountValidator;
  }
}
