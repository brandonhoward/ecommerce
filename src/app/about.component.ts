import { AppService } from './services/app.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
    @ViewChild('dataDump') dataDump;

    constructor(private appService: AppService) {}

    fetchRestrictedData(): void {
      const token = this.appService.signedInUser ? this.appService.signedInUser.token : '';
      this.appService.getData(token).subscribe((data) => {
        this.dataDump.nativeElement.innerHTML = data['restrictedData'];
      }, (err) => {

      });
    }
}
