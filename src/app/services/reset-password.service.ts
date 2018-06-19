import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import Config from '../../../app-config';

@Injectable()
export class ResetPasswordService {

  constructor(private http: HttpClient, private router: Router) {}

  private testUrl = Config.nodeApi;

  changePassword(newPassword, token) {
    this.http
      .post(this.testUrl + 'users/reset/' + token, {password: newPassword}, )
      .subscribe(
        // Successful responses call the first callback.
        data => {
            // this.push.success('Password Succesfully changed');
            this.router.navigate(['login']);
        },
        // Errors will call this callback instead:
        err => {
          // this.push.error('Something went wrong');
        }
      );
}

}
