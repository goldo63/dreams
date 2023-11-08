import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LayoutComponent } from './Templates/layout/layout.component';
import { FooterComponent } from './Templates/footer/footer.component';
import { HeaderComponent } from './Templates/header/header.component';
import { AboutComponent } from './Pages/About/about.component';

// import { ConfigModule } from '@dreams/utility'
// import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserModule,
    // ConfigModule.forRoot({ apiEndpoint: environment.SERVER_API_URL }),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
