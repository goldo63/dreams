import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { EditUserComponent } from './user/edit/editUser.component';
import { DetailUserComponent } from './user/detail/detailUser.component';

import { PostComponent } from './post/post.component';
import { EditPostComponent } from './post/create/editPost.component';
import { DetailPostComponent } from './post/detail/detailPost.component';
import { ReactionsComponent } from './post/detail/reactions/reactions.component';

const componentRoute: Routes = [
  { path: 'user/:id', component: DetailUserComponent },
  { path: 'user/:id/update', component: EditUserComponent },

  { path: 'post', component: PostComponent },
  { path: 'post/create', component: EditPostComponent },
  { path: 'post/:id', component: DetailPostComponent },
  { path: 'post/:id/update', component: EditPostComponent },
];

@NgModule({
  declarations: [
    EditUserComponent,
    DetailUserComponent,
    PostComponent,
    EditPostComponent,
    DetailPostComponent,
    ReactionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    QuillModule.forRoot(),
    RouterModule.forChild(componentRoute),
  ],
  exports: [RouterModule,ReactionsComponent],
})
export class ComponentModule {}
