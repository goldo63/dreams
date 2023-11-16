import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './user/create/editUser.component';
import { DetailUserComponent } from './user/detail/detailUser.component';

const componentRoute: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'user/create', component: EditUserComponent },
  { path: 'user/:id', component: DetailUserComponent },
  { path: 'user/:id/update', component: EditUserComponent },
  
  // ... other child routes if needed
];

@NgModule({
  declarations: [
      UserComponent,
      EditUserComponent,
      DetailUserComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild(componentRoute)
  ],
  exports: [RouterModule]
})
export class ComponentModule {}
