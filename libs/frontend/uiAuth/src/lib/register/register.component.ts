import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { IUser, UserRegistration } from '@dreams/shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'dreams-app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.formData.account.accountDetails = this.extraData;
    this.formData.account.username = this.formData.username;
    
    console.log(this.formData);
    this.authService.register(this.formData).subscribe(
      (result) => {
        // Handle registration success
        console.log('Registration successful:', result);
        // Redirect to posts page on success
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        // Handle registration error
        console.error('Registration error:', error);
        // You can show an error message to the user or perform other actions
      }
    );
  }
}
