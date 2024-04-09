import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DetailUserComponent } from './user/detail/detailUser.component';

import { PostComponent } from './post/post.component';
import { EditPostComponent } from './post/create/editPost.component';
import { DetailPostComponent } from './post/detail/detailPost.component';
import { ReactionsComponent } from './post/detail/reactions/reactions.component';
import { TagsComponent } from './post/tags/tags.component';
import { RegisterComponent } from '@dreams/frontend/uiAuth';

const componentRoute: Routes = [
  { path: 'user', component: DetailUserComponent },
  { path: 'user/update', component: RegisterComponent },

  { path: 'post', component: PostComponent },
  { path: 'post/create', component: EditPostComponent },
  { path: 'post/:id', component: DetailPostComponent },
  { path: 'post/:id/update', component: EditPostComponent },
];

@NgModule({
  declarations: [
    DetailUserComponent,
    PostComponent,
    EditPostComponent,
    DetailPostComponent,
    ReactionsComponent,
    TagsComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule,
    FormsModule,
    QuillModule.forRoot(),
    RouterModule.forChild(componentRoute),
  ],
  exports: [RouterModule, ReactionsComponent],
})
export class ComponentModule {}
