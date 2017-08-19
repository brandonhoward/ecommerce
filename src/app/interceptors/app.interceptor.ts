import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercepted the request');
        // TODO: add authorization header here and remove from individial requests

        return next.handle(req).do(evt => {
            if (evt instanceof HttpResponse) {
                console.log('intercepted the response');
            }
        }, err => {
            if (err instanceof HttpErrorResponse) {
                console.log('intercepted the error response');
                this.router.navigate(['/notauthorized']);
            }
        });
    }
}
