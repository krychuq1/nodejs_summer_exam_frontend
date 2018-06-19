import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import Config from '../../../../app-config';

@Injectable()
export class SignupService {

  private testUrl = Config.nodeApi;
  constructor( private http: HttpClient, private router: Router) {}

  signUserIn (User, captcha, number?: number) {


    this.http
      .post(this.testUrl + 'users/signup', {companyName: User.companyName, email: User.email,
        password: User.password, image: User.image, captcha: captcha, phone: number}, )
      .subscribe(
        // Successful responses call the first callback.
        data => {

          this.router.navigate(['login']);
        },
        // Errors will call this callback instead:
        err => {
          // this.push.error('Something went wrong');
        }
      );}
    saveImage(img) {
    const url = this.testUrl + 'users/image';
    return this.http.post(url, {src: img.src});
  }

}
