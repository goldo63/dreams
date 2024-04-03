import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './lib/login/login.component';
import { RegisterComponent } from './lib/register/register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const componentRoute: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule.forChild(componentRoute),
  ],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
