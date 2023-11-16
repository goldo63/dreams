import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '@dreams/frontend/ui';

@Component({
  selector: 'dreams-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dreams';
}
