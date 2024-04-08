import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}
  
  onSubmit(): void {
    this.authService.login(this.formData).subscribe(
      (response) => {
        // Handle successful login
        console.log('Login successful:', response);
        this.router.navigate(['/item/post']);
      },
      (error) => {
        // Handle login error
        console.error('Login error:', error);
      }
    );
  }

  ngOnInit(): void {
    const user = this.authService.getAuthIdentifier();
    if (user) {
      this.router.navigate(['/item/post']);
    }
  }

  isValid(): boolean {
    return this.formData.username.trim() !== '' && this.formData.password.trim() !== '';
  }
}
