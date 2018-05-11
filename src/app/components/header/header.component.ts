import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {LoginService} from "../../services/login.service";


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public userService: UserService, private loginService: LoginService) {
    this.userService.doMagic();

  }
  logout(){
    this.loginService.logout();
  }

}

