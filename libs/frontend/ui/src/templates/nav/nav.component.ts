import { Component } from '@angular/core';
import { AuthService } from '@dreams/frontend/uiAuth';
import { AuthIdentifier, Iidentity } from '@dreams/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dreams-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  user: Iidentity | undefined;
  private currentUserSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.currentUserSubscription = this.authService.currentUser$.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  logout(): void {
    // Call the logout method from your AuthService
    this.authService.logout();
  }
}
