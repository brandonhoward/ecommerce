import { Router } from '@angular/router';
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

    constructor(private appService: AppService, private router: Router) {
      this.appService = appService;
    }

    doSignIn() {
      const link = ['/login'];
      this.router.navigate(link);
    }

    doGuest() {
      // TODO: pull this json from form
      const body = {
        username: 'bhoward',
        password: 'abc123'
      };
    }
}
