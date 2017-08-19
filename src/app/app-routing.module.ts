import { Error401Component } from './errors/error401.component';
import { Error404Component } from './errors/error404.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';
import { LoginComponent } from './login.component';
import { LandingComponent } from './landing.component';

const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    }, {
        path: 'about',
        component: AboutComponent
    }, {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'notauthorized',
        component: Error401Component

    }, {
        // If we get this far the page is not found
        path: '**',
        component: Error404Component
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: []
})

export class AppRoutingModule  {}
