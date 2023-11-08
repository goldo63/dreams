import { Route } from '@angular/router';
import { AboutComponent } from './Pages/About/about.component'
import { LayoutComponent } from './Templates/layout/layout.component'
import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', pathMatch: 'full', component: AboutComponent },
          { path: 'home', pathMatch: 'full', redirectTo: '' },
          { path: 'about', pathMatch: 'full', component: AboutComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}