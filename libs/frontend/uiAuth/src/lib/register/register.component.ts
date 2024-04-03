import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserRegistration } from '@dreams/shared/models';

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

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.authService.register(this.formData).subscribe((result) => {
      // Handle registration success or error
      console.log(result);
    });
  }
}
