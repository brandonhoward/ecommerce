import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';
import { LoginComponent } from './login.component';
import { LandingComponent } from './landing.component';

const routes: Routes = [
    {
        //path: '',
        //component: AboutComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: []
})

export class AppRoutingModule  {}