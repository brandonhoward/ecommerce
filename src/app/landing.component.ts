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
      this.appService.getData().subscribe(data => {
        this.users = data['users'];
        this.dataNum = data['data'];
      });
    }

    doGuest() {
      // TODO: pull this json from form
      const body = {
        username: 'bhoward',
        password: 'abc123'
      };

      this.appService.postLogin(body).subscribe(data => {
        const user = data['user'];
        if (user) {
          // TODO: create a logged in User object
          alert('Logged in successfully with: ' + user.username);
        } else {
          alert('Failed to login');
        }
      });
    }
}
