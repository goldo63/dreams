import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './user/create/editUser.component';
import { DetailUserComponent } from './user/detail/detailUser.component';

const componentRoute: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: DetailUserComponent },
  { path: 'user/create', component: EditUserComponent },
  { path: 'user/:id/update', component: EditUserComponent },
  
  // ... other child routes if needed
];

@NgModule({
  declarations: [EditUserComponent, DetailUserComponent],
  imports: [CommonModule, RouterModule.forChild(componentRoute)],
})
export class ComponentModule {}
