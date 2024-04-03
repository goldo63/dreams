import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './lib/login/login.component';
import { RegisterComponent } from './lib/register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
