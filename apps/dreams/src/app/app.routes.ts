import { Route } from '@angular/router';
import { AboutComponent } from './Pages/About/about.component'
import { LayoutComponent } from './Templates/layout/layout.component'

export const appRoutes: Route[] = [
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
