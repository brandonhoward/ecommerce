import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    private dataUrl = '/api/data';
    private loginUrl = '/api/login';
    private users: string[];
    private data: number;

    constructor(private http: HttpClient) { }

    getData(): Observable<any> {
        return this.http.get(this.dataUrl);
    }

    postLogin(body): Observable<any> {
        const myHeaders = new HttpHeaders();
        myHeaders.set('Content-Type', 'application/json');
        return this.http.post(this.loginUrl, {'body': body}, {headers: myHeaders});
    }
}
