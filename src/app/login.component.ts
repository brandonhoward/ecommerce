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
    }

    onSubmit(): void {
      if (this.loginForm.status === 'INVALID') { return; } // client side validation

      const body = {
        username: this.loginForm.controls['username'].value as string,
        password: this.loginForm.controls['password'].value as string
      };

      this.appService.postLogin(body).subscribe((data) => {
        const user = data;
        if (user) {
          this.appService.signInUser(user);
          // save the user in local storage
          window.localStorage.setItem('user', JSON.stringify(user));
          this.loginForm.controls['username'].setValue('');
          this.loginForm.controls['password'].setValue('');
          alert('Welcome: ' + user.username);
        } else {
          this.loginForm.controls['password'].setValue('');
          alert('no user found with those credentials');
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
