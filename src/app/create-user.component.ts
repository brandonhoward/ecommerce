import { AppService } from './services/app.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import User from './../../src/app/actors/user';

@Component({
  selector: 'app-create',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {
    userForm: FormGroup;
    title = 'Create User';

    constructor(private fb: FormBuilder, private appService: AppService) {
        this.createForm();
    }

    onSubmit(): void {
        if (this.userForm.status === 'INVALID') { return; } // client side validation
        if (this.userForm.controls['password'].value !== this.userForm.controls['confirmpassword'].value) { return; }

        const body = {
            username: this.userForm.controls['username'].value as string,
            password: this.userForm.controls['password'].value as string,
            dob: new Date(this.userForm.controls['dob'].value as string) as Date
        };

        this.appService.postCreate(body).subscribe((data) => {
            if (data.success) {
                alert('created a new user in the db. Redirecting to sign in...');
                this.appService.redirect('/');
            } else {
                alert('error: username is already taken.');
            }
        });
    }

    private createForm(): void {
        this.userForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmpassword: ['', Validators.required],
            dob: ['', Validators.required]
        });
    }

    ngOnInit(): void {

    }
}
