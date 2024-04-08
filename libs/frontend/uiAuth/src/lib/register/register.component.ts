import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { IAccount, IUser, UserRegistration } from '@dreams/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from 'libs/frontend/components/src/user/user.service';

@Component({
  selector: 'dreams-app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formData: UserRegistration = {
    username: '',
    password: '',
    account: {
      id: '',
      username: '',
      phoneNumber: '',
      dateOfRegistration: new Date(),
      accountDetails: {
        email: '',
        firstName: '',
        lastName: '',
        friends: []
      }
    }
  };

  extraData: IUser = {
    email: '',
    firstName: '',
    lastName: '',
    friends: []
  };

  updatingUser = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.url.pipe(
      switchMap((segments) => {
        if (segments.length > 0 && segments[segments.length - 1].path === 'update') {
          this.updatingUser = true;
          // Wrap this.authService.getAuthIdentifier()?.user.id with of() to convert it into an observable
          return of(this.authService.getAuthIdentifier()?.user.id);
        } else {
          this.updatingUser = false;
          return of(null);
        }
      })
    ).subscribe((userId: string | null | undefined) => {
      if (userId) {
        // Assuming you have a method to get user profile by ID in your authService
        this.userService.getById(userId).subscribe((userProfile: IAccount | null) => {
          if (userProfile) {
            const userDetails = userProfile.accountDetails as IUser;
            this.formData.username = userProfile.username;
            this.formData.account.id = userProfile.id;
            this.formData.account.phoneNumber = userProfile.phoneNumber;
            this.extraData.email = userDetails.email;
            this.extraData.firstName = userDetails.firstName;
            this.extraData.lastName = userDetails.lastName;
          }
        });
      }
    });
  }

  onSubmit(): void {
    this.formData.account.accountDetails = this.extraData;
    this.formData.account.username = this.formData.username;
    
    if (this.updatingUser) {
      // Assuming you have a method to update user profile in your authService
      this.userService.updateUser(this.formData).subscribe(
        (result) => {
          console.log('Update successful:', result);
          // Redirect to appropriate page after update
          this.router.navigate(['/item/user']);
        },
        (error) => {
          console.error('Update error:', error);
          // Handle error accordingly
        }
      );
    } else {
      this.authService.register(this.formData).subscribe(
        (result) => {
          console.log('Registration successful:', result);
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          console.error('Registration error:', error);
          // Handle error accordingly
        }
      );
    }
  }
}
