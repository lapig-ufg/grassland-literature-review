import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
    {
        path: 'literature', component: AppLayoutComponent,
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
    },
    { path: 'notfound', loadChildren: () => import('./shared/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
