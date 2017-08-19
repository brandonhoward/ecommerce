import { AppService } from './../services/app.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error401',
  templateUrl: './error401.component.html',
  styleUrls: ['./error401.component.css']
})
export class Error401Component {
    constructor(private appService: AppService) {}

    goHome(): void {
        this.appService.redirect(['']);
    }
}
