import { AppService } from './../services/app.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component {
    constructor(private appService: AppService) {}

    goHome(): void {
      this.appService.redirect(['']);
    }
}
