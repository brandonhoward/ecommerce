import { AppService } from './services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
    users: string[];
    dataNum: number;

    constructor(private appService: AppService) {
      this.appService = appService;
    }

    doSignIn() {
      this.appService.redirect('/login');
    }

    doGuest() {
      // TODO: pull this json from form
      const body = {
        username: 'bhoward',
        password: 'abc123'
      };
    }

    doCreateAccount() {
      this.appService.redirect('/create');
    }

    doForgotUsername() {
      this.appService.redirect('/forgot-username');
    }

    doForgotPassword() {
      this.appService.redirect('/forgot-password');
    }
}
