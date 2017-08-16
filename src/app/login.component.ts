import { AppService } from './services/app.service';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import User from './../../src/app/actors/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    signedInUser: User;
    loginForm: FormGroup;
    title = 'Login';

    constructor(private fb: FormBuilder, private appService: AppService) {
      this.createForm();
      // this.signedInUser = new User(2131, 'bhoward', 'abc123', new Date('02/18/1993'));
    }

    onSubmit(): void {
      if (this.loginForm.status === 'INVALID') { return; } // client side validation

      const formModel = this.loginForm.value;
      const body = {
        username: formModel.username as string,
        password: formModel.password as string
      };

      this.appService.postLogin(body).subscribe((data) => {
        const user = data['user'];
        if (user) {
          this.appService.signInUser(user);
          formModel.username = '';
          formModel.password = '';
        } else {
          formModel.password = ''; //TODO: refresh view
          alert('Failed to login');
        }
      });
    }

    private createForm(): void {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
}
