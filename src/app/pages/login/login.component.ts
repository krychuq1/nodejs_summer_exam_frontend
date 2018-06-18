import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  message: string;
  warningShow: boolean;

  loginForm = new FormGroup ({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private loginService: LoginService, private toastr: ToastrService) {
    this.warningShow = false;
    // insert test value
    this.loginForm.controls.email.setValue('kry@kry.com');
    this.loginForm.controls.password.setValue('Master1');

  }




  login () {
    const password = this.loginForm.controls.password.value;
    const email = this.loginForm.controls.email.value;
    // check if form is valid
    if (email && password) {
     this.loginService.logUserIn(email, password).then(value => {
       this.toastr.success('Successful login');

      }, error => {
       this.toastr.error('Email or password is incorrect');

       console.log('error ', error);
     }).catch(error => {

        this.message = error.error;
        this.warningShow = true;

      });

    } else {
      this.toastr.error('Fill all the fields');
    }
  }



}
