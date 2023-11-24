import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { EditUserComponent } from './user/create/editUser.component';
import { DetailUserComponent } from './user/detail/detailUser.component';

import { PostComponent } from './post/post.component';
import { EditPostComponent } from './post/create/editPost.component';
import { DetailPostComponent } from './post/detail/detailPost.component';

const componentRoute: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'user/create', component: EditUserComponent },
  { path: 'user/:id', component: DetailUserComponent },
  { path: 'user/:id/update', component: EditUserComponent },

  { path: 'post', component: PostComponent },
  { path: 'post/create', component: EditPostComponent },
  { path: 'post/:id', component: DetailPostComponent },
  { path: 'post/:id/update', component: EditPostComponent },
];

@NgModule({
  declarations: [
    UserComponent,
    EditUserComponent,
    DetailUserComponent,
    PostComponent,
    EditPostComponent,
    DetailPostComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild(componentRoute),
  ],
  exports: [RouterModule],
})
export class ComponentModule {}
