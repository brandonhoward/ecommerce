import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
    constructor() {
      alert("landing component constructed");
    }

    doSignIn() {
      alert("sign in");
    }

    doGuest() {
      alert("guest enter");
    }
}