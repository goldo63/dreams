import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { NavComponent } from './templates/nav/nav.component';

import { AboutComponent } from './static/about/about.component';
import { RouterModule } from '@angular/router'; 

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        NavComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgbNavModule,
        NgbDropdownModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        AboutComponent
    ]
})
export class UiModule {
}