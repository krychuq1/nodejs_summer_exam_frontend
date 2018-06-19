
import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {UserService} from './services/user.service';
import {LocalStorage} from '@ngx-pwa/local-storage';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot) {
      if (this.userService.token) {
          return true;
      }else {
        this.router.navigate(['/login']);
        return false;
      }

  }

}
