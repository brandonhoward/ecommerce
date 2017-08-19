import { AppService } from './services/app.service';
import { Component, OnInit } from '@angular/core';
import User from './../../src/app/actors/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    if (!this.appService.signedInUser && window.localStorage.getItem('user')) {
      const user = JSON.parse(window.localStorage.getItem('user')) as User;
      console.log(user);
      this.appService.signInUser(user);
    }
  }

  doLogout(): void {
    const body = {
      user: this.appService.signedInUser
    };

    this.appService.postLogout(body).subscribe((data) => {
      if (data['success'] === true) {
        this.appService.signOutUser();
      }
    });
  }
}
