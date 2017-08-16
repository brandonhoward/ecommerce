import { AppService } from './services/app.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private appService: AppService) {}

  doLogout(): void {
    this.appService.signOutUser();
  }

}
