import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';

import { AboutComponent } from './static/about/about.component';
import { RouterModule } from '@angular/router'; 

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        AboutComponent
    ]
})
export class UiModule {
}