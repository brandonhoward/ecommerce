import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import User from './../../../src/app/actors/user';

@Injectable()
export class AppService {
    signedInUser: User;
    private dataUrl = '/api/data';
    private loginUrl = '/api/login';
    private logoutUrl = '/api/logout';
    private createUrl = '/api/create';

    constructor(private http: HttpClient, private router: Router) { }

    redirect(link): void {
        if (typeof link === 'string') {
            this.router.navigate([link]);
        } else {
            this.router.navigate(link);
        }
    }

    signInUser(user): void {
        this.signedInUser = user;
    }

    signOutUser(): void {
        if (this.signedInUser) {
            this.signedInUser = null;
            window.localStorage.clear();
        }

        const link = ['/'];
        this.router.navigate(link);
    }

    getData(token): Observable<any> {
        const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        return this.http.get(this.dataUrl, {headers: myHeaders});
    }

    postLogin(body): Observable<any> {
        const myHeaders = new HttpHeaders();
        myHeaders.set('Content-Type', 'application/json');
        return this.http.post(this.loginUrl, {'body': body}, {headers: myHeaders});
    }

    postLogout(body): Observable<any> {
        const myHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + body.user.token);
        return this.http.post(this.logoutUrl, {'body': body}, {headers: myHeaders});
    }

    postCreate(body): Observable<any> {
        return this.http.post(this.createUrl, {'body': body});
    }
}
