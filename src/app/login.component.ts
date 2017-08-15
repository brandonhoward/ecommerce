import { Component } from '@angular/core';
import { FormBuilder, Validator, FormsModule } from '@angular/forms';
import User from './../../src/app/actors/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    title = 'Login';
    user: User;

    constructor() {
      this.user = new User(2131, 'bhoward', 'abc123', new Date('02/18/1993'));
    }

    welcomeUser(): string {
      return ("Hello " + this.user.username + ", welcome to the site.");
    }

    getUserDiagnostic(): string {
      return this.user.toJson();
    }
}