import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import Config from '../../../app-config';
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
              this.router.navigate(['']);

              this.localStorage.setItem('token', data['token']).subscribe((val) => {

                this.userService.setUser(data['user'], data['token']);
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
    this.localStorage.removeItem('token').subscribe((val) => {
      this.userService.setUser(null);
      this.push.success('logout completed');
    });
  }

}
