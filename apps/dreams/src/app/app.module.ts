import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { UiModule } from '@dreams/frontend/ui'
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    UiModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
