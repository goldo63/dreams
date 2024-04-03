import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserRegistration } from '@dreams/shared/models';

@Component({
  selector: 'dreams-app-edit',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.css']
})
export class EditUserComponent implements OnInit {
  formData: UserRegistration = {
    username: '',
    password: '', // Optionally include password update
    account: {
      id: '', // ID of the user being edited
      username: '',
      phoneNumber: '',
      dateOfRegistration: new Date(),
      accountDetails: {
        email: '',
        firstName: '',
        lastName: '',
        friends: [] // If friends are editable
      }
    }
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUser(); // Fetch the current user's data
  }

  fetchUser(): void {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.formData.account = user;
      }
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.formData).subscribe(updatedUser => {
      // Handle edit success or error
      console.log(updatedUser);
    });
  }
}
