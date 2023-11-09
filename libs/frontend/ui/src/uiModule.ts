import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { LayoutComponent } from './templates/layout/layout.component';

import { AboutComponent } from './static/about/about.component';
import { RouterModule } from '@angular/router'; 

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        LayoutComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        LayoutComponent,
        AboutComponent
    ]
})
export class UiModule {
}