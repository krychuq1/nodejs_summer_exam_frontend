import { Component } from '@angular/core';
import {UserService} from './services/user.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  token: string;
  title = 'app';

  constructor(protected localStorage: LocalStorage, public userService: UserService) {
    this.localStorage.getItem('token').subscribe(token => {
      if (token) {
        this.userService.getUserBasedToken(token);
      }
    });
  }


}
