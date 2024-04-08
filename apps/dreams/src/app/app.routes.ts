import { AboutComponent } from '@dreams/frontend/ui';
import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AboutComponent},
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  { path: 'about', pathMatch: 'full', component: AboutComponent},
  { path: 'item',
    loadChildren: () =>
    import ('@dreams/frontend/components').then(
      (module) => module.ComponentModule
    )
  },
  { path: 'auth', loadChildren: () => 
    import ('@dreams/frontend/uiAuth').then(
      (module) => module.AuthModule
    ) 
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}