import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import Config from '../../../app-config';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class LoginService {

  private url = Config.nodeApi;

  constructor( private http: HttpClient, private push: ToastrService, private router: Router,
               private userService: UserService, protected localStorage: LocalStorage) {
  }

  logUserIn (email, pass) {

    return new Promise((resolve, reject) => {
      this.http.post(this.url + 'users/login', {email: email, password: pass})
        .subscribe(data => {
            const message = data['message'];
            if (data['success']) {
              const token = data['token'];
              // let user = data['user'];
              this.localStorage.setItem('token', data['token']).subscribe((val) => {
                this.userService.setUser(data['user']);
                this.router.navigate(['']);
                resolve(data['message']);
              });
            }
            resolve(message);
          },
          error => { // Error
            reject(error);
          }
        );
    });
  }

  logout() {
    Cookie.delete('token');
    // this.router.navigate(['login']);
    this.userService.setUser(null);
  }

}
