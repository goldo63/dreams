import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'dreams-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.formData).subscribe(
      (response) => {
        // Handle successful login
        console.log('Login successful:', response);
      },
      (error) => {
        // Handle login error
        console.error('Login error:', error);
      }
    );
  }

  isValid(): boolean {
    return this.formData.username.trim() !== '' && this.formData.password.trim() !== '';
  }
}
